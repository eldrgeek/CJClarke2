
import React, { useState, useRef, useEffect } from 'react';

interface ElementPosition {
  id: string;
  left: number;
  top: number;
  width: number;
  height: number;
}

const ClarkCampaignCard = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [elementPositions, setElementPositions] = useState<ElementPosition[]>([
    { id: 'photo-frame', left: 245, top: 105, width: 525, height: 790 },
    { id: 'clark-text', left: 684, top: 648, width: 1191, height: 237 },
    { id: 'vote-text', left: 684, top: 386, width: 1191, height: 234 },
    { id: 'city-council-text', left: 50, top: 931, width: 200, height: 40 },
    { id: 'christophe-name', left: 50, top: 1101, width: 300, height: 40 },
    { id: 'description-text', left: 50, top: 1171, width: 800, height: 160 },
    { id: 'contact-text', left: 50, top: 1364, width: 400, height: 20 },
    { id: 'contact-info', left: 50, top: 1400, width: 500, height: 20 },
  ]);

  const containerRef = useRef<HTMLDivElement>(null);

  // Generate larger star positions for two rows
  const generateStars = (row: number) => {
    const stars = [];
    const starSpacing = 1900 / 25; // Distribute 25 stars across 1900px width

    for (let i = 0; i < 25; i++) {
      const x = i * starSpacing + starSpacing / 2; // Center each star in its spacing
      const y = row === 1 ? 91 + 54.5 : 91 + 54.5 + 55; // Two rows: 91-145.5 and 146.5-201

      stars.push(
        <div
          key={`star-${row}-${i}`}
          data-element-id={`star-${row}-${i}`}
          className={`star-element ${isEditMode ? 'editable-element' : ''} ${selectedElement === `star-${row}-${i}` ? 'selected' : ''}`}
          style={{
            position: 'absolute',
            left: `${x}px`,
            top: `${y}px`,
            width: '25px', // Made stars bigger
            height: '25px', // Made stars bigger
            backgroundColor: 'white',
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            cursor: isEditMode ? 'pointer' : 'default',
          }}
          onClick={(e) => {
            if (isEditMode) {
              e.stopPropagation();
              setSelectedElement(`star-${row}-${i}`);
            }
          }}
        />
      );
    }
    return stars;
  };

  const getElementPosition = (id: string): ElementPosition | undefined => {
    return elementPositions.find(pos => pos.id === id);
  };

  const updateElementPosition = (id: string, updates: Partial<ElementPosition>) => {
    setElementPositions(prev =>
      prev.map(pos =>
        pos.id === id ? { ...pos, ...updates } : pos
      )
    );
  };

  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    if (!isEditMode) return;

    e.preventDefault();
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const element = getElementPosition(elementId);
    if (!element) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicking on resize handle (bottom-right corner)
    const isResizeHandle = x >= element.left + element.width - 20 &&
                          y >= element.top + element.height - 20;

    if (isResizeHandle) {
      setIsResizing(true);
      setResizeStart({ x, y, width: element.width, height: element.height });
    } else {
      setIsDragging(true);
      setDragOffset({ x: x - element.left, y: y - element.top });
    }
    setSelectedElement(elementId);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isEditMode || (!isDragging && !isResizing)) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (selectedElement) {
      if (isDragging) {
        const newLeft = x - dragOffset.x;
        const newTop = y - dragOffset.y;
        updateElementPosition(selectedElement, { left: newLeft, top: newTop });
      } else if (isResizing) {
        const newWidth = Math.max(20, resizeStart.width + (x - resizeStart.x));
        const newHeight = Math.max(20, resizeStart.height + (y - resizeStart.y));
        updateElementPosition(selectedElement, { width: newWidth, height: newHeight });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const exportPositions = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      elements: elementPositions,
      notes: "Exported from Card3 editor - use these values to update the component code"
    };
    console.log('=== CARD3 ELEMENT POSITIONS EXPORT ===');
    console.log(JSON.stringify(exportData, null, 2));
    console.log('=== END EXPORT ===');

    // Also copy to clipboard if possible
    if (navigator.clipboard) {
      navigator.clipboard.writeText(JSON.stringify(exportData, null, 2));
      alert('Positions exported to console and copied to clipboard!');
    } else {
      alert('Positions exported to console! Copy the JSON from the browser console.');
    }
  };

  const resetPositions = () => {
    if (confirm('Reset all element positions to defaults?')) {
      setElementPositions([
        { id: 'photo-frame', left: 245, top: 105, width: 525, height: 790 },
        { id: 'clark-text', left: 684, top: 648, width: 1191, height: 237 },
        { id: 'vote-text', left: 684, top: 386, width: 1191, height: 234 },
        { id: 'city-council-text', left: 50, top: 931, width: 200, height: 40 },
        { id: 'christophe-name', left: 50, top: 1101, width: 300, height: 40 },
        { id: 'description-text', left: 50, top: 1171, width: 800, height: 160 },
        { id: 'contact-text', left: 50, top: 1364, width: 400, height: 20 },
        { id: 'contact-info', left: 50, top: 1400, width: 500, height: 20 },
      ]);
      setSelectedElement(null);
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isEditMode) {
      document.addEventListener('mouseup', handleGlobalMouseUp);
      return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
    }
  }, [isEditMode]);

  const photoPos = getElementPosition('photo-frame');
  const clarkPos = getElementPosition('clark-text');
  const votePos = getElementPosition('vote-text');
  const cityPos = getElementPosition('city-council-text');
  const namePos = getElementPosition('christophe-name');
  const descPos = getElementPosition('description-text');
  const contactPos = getElementPosition('contact-text');
  const infoPos = getElementPosition('contact-info');

  return (
    <div>
      {/* Editor Controls */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        background: 'white',
        border: '2px solid #333',
        borderRadius: '8px',
        padding: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
      }}>
        <div style={{ marginBottom: '8px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 'bold' }}>
            <input
              type="checkbox"
              checked={isEditMode}
              onChange={(e) => {
                setIsEditMode(e.target.checked);
                if (!e.target.checked) {
                  setSelectedElement(null);
                }
              }}
            />
            Edit Mode
          </label>
        </div>

        {isEditMode && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '12px', color: '#666' }}>
              Selected: {selectedElement || 'None'}
            </div>
            <button
              onClick={exportPositions}
              style={{
                background: '#007bff',
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Export Positions
            </button>
            <button
              onClick={resetPositions}
              style={{
                background: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Reset Positions
            </button>
          </div>
        )}
      </div>

      {/* Card Container */}
      <div
        ref={containerRef}
        style={{
          width: '2100px',
          height: '1500px',
          backgroundColor: '#01264e', // Navy blue background
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'serif', // Serif font for all text
          border: '1px solid black', // 1px black border as requested
          cursor: isEditMode ? 'default' : 'default'
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={() => isEditMode && setSelectedElement(null)}
      >
        {/* Horizontal Red Bar (0-91px height) */}
        <div
          style={{
            position: 'absolute',
            top: '0px',
            left: '0px',
            right: '0px',
            height: '91px',
            backgroundColor: '#fe0100',
            zIndex: 1,
          }}
        />

        {/* Red Stripe (1900-2010px width) */}
        <div
          style={{
            position: 'absolute',
            top: '0px',
            left: '1900px',
            bottom: '0px',
            width: '110px',
            backgroundColor: '#fe0100',
            zIndex: 1,
          }}
        />

        {/* White Stripe (2010-2100px width) */}
        <div
          style={{
            position: 'absolute',
            top: '0px',
            left: '2010px',
            bottom: '0px',
            width: '90px',
            backgroundColor: 'white',
            zIndex: 1,
          }}
        />

        {/* Two Rows of White Stars */}
        {generateStars(1)}
        {generateStars(2)}

        {/* Photo Frame */}
        <div
          data-element-id="photo-frame"
          className={`editable-element ${selectedElement === 'photo-frame' ? 'selected' : ''}`}
          style={{
            position: 'absolute',
            left: `${photoPos?.left || 245}px`,
            top: `${photoPos?.top || 105}px`,
            width: `${photoPos?.width || 525}px`,
            height: `${photoPos?.height || 790}px`,
            backgroundColor: selectedElement === 'photo-frame' ? 'rgba(255, 107, 53, 0.1)' : 'white',
            padding: '40px',
            boxSizing: 'border-box',
            zIndex: 3,
            cursor: isEditMode ? 'move' : 'default',
            border: isEditMode ? '2px dashed #ff6b35' : 'none'
          }}
          onMouseDown={(e) => handleMouseDown(e, 'photo-frame')}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#01264e',
              padding: '10px',
              boxSizing: 'border-box',
            }}
          >
            <img
              src="/images/Chris Head Shot.jpeg"
              alt="Chris Head Shot"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
          {/* Resize handle */}
          {isEditMode && selectedElement === 'photo-frame' && (
            <div
              style={{
                position: 'absolute',
                bottom: '-10px',
                right: '-10px',
                width: '20px',
                height: '20px',
                background: '#ff6b35',
                border: '2px solid white',
                borderRadius: '50%',
                cursor: 'nw-resize',
                zIndex: 10
              }}
            />
          )}
        </div>

        {/* "CLARK" Text */}
        <div
          data-element-id="clark-text"
          className={`editable-element ${selectedElement === 'clark-text' ? 'selected' : ''}`}
          style={{
            position: 'absolute',
            left: `${clarkPos?.left || 684}px`,
            top: `${clarkPos?.top || 648}px`,
            width: `${clarkPos?.width || 1191}px`,
            height: `${clarkPos?.height || 237}px`,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            fontSize: '120px',
            fontWeight: 'bold',
            color: '#fe0100',
            textAlign: 'center',
            fontFamily: 'serif',
            WebkitTextStroke: '3px white',
            zIndex: 4,
            cursor: isEditMode ? 'move' : 'default',
            border: isEditMode ? '2px dashed #ff6b35' : 'none',
            backgroundColor: selectedElement === 'clark-text' ? 'rgba(255, 107, 53, 0.1)' : 'transparent'
          }}
          onMouseDown={(e) => handleMouseDown(e, 'clark-text')}
        >
          CLARK
          {/* Resize handle */}
          {isEditMode && selectedElement === 'clark-text' && (
            <div
              style={{
                position: 'absolute',
                bottom: '-10px',
                right: '-10px',
                width: '20px',
                height: '20px',
                background: '#ff6b35',
                border: '2px solid white',
                borderRadius: '50%',
                cursor: 'nw-resize',
                zIndex: 10
              }}
            />
          )}
        </div>

        {/* "VOTE" Text */}
        <div
          data-element-id="vote-text"
          className={`editable-element ${selectedElement === 'vote-text' ? 'selected' : ''}`}
          style={{
            position: 'absolute',
            left: `${votePos?.left || 684}px`,
            top: `${votePos?.top || 386}px`,
            width: `${votePos?.width || 1191}px`,
            height: `${votePos?.height || 234}px`,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            fontSize: '80px',
            fontWeight: 'bold',
            fontFamily: 'serif',
            color: 'white',
            textAlign: 'center',
            zIndex: 4,
            cursor: isEditMode ? 'move' : 'default',
            border: isEditMode ? '2px dashed #ff6b35' : 'none',
            backgroundColor: selectedElement === 'vote-text' ? 'rgba(255, 107, 53, 0.1)' : 'transparent'
          }}
          onMouseDown={(e) => handleMouseDown(e, 'vote-text')}
        >
          VOTE
          {/* Resize handle */}
          {isEditMode && selectedElement === 'vote-text' && (
            <div
              style={{
                position: 'absolute',
                bottom: '-10px',
                right: '-10px',
                width: '20px',
                height: '20px',
                background: '#ff6b35',
                border: '2px solid white',
                borderRadius: '50%',
                cursor: 'nw-resize',
                zIndex: 10
              }}
            />
          )}
        </div>

        {/* "City council | Ward 3" Text */}
        <div
          data-element-id="city-council-text"
          className={`editable-element ${selectedElement === 'city-council-text' ? 'selected' : ''}`}
          style={{
            position: 'absolute',
            left: `${cityPos?.left || 50}%`,
            top: `${cityPos?.top || 931}px`,
            width: `${cityPos?.width || 200}px`,
            height: `${cityPos?.height || 40}px`,
            fontSize: '24px',
            fontFamily: 'serif',
            color: 'white',
            textAlign: 'center',
            zIndex: 4,
            cursor: isEditMode ? 'move' : 'default',
            border: isEditMode ? '2px dashed #ff6b35' : 'none',
            backgroundColor: selectedElement === 'city-council-text' ? 'rgba(255, 107, 53, 0.1)' : 'transparent',
            transform: selectedElement === 'city-council-text' ? 'none' : 'translateX(-50%)'
          }}
          onMouseDown={(e) => handleMouseDown(e, 'city-council-text')}
        >
          CITY COUNCIL | WARD 3
          {/* Resize handle */}
          {isEditMode && selectedElement === 'city-council-text' && (
            <div
              style={{
                position: 'absolute',
                bottom: '-10px',
                right: '-10px',
                width: '20px',
                height: '20px',
                background: '#ff6b35',
                border: '2px solid white',
                borderRadius: '50%',
                cursor: 'nw-resize',
                zIndex: 10
              }}
            />
          )}
        </div>

        {/* "Christophe James Clark" Text */}
        <div
          data-element-id="christophe-name"
          className={`editable-element ${selectedElement === 'christophe-name' ? 'selected' : ''}`}
          style={{
            position: 'absolute',
            left: `${namePos?.left || 50}%`,
            top: `${namePos?.top || 1101}px`,
            width: `${namePos?.width || 300}px`,
            height: `${namePos?.height || 40}px`,
            fontSize: '28px',
            fontWeight: 'bold',
            fontFamily: 'serif',
            color: 'white',
            textAlign: 'center',
            zIndex: 4,
            cursor: isEditMode ? 'move' : 'default',
            border: isEditMode ? '2px dashed #ff6b35' : 'none',
            backgroundColor: selectedElement === 'christophe-name' ? 'rgba(255, 107, 53, 0.1)' : 'transparent',
            transform: selectedElement === 'christophe-name' ? 'none' : 'translateX(-50%)'
          }}
          onMouseDown={(e) => handleMouseDown(e, 'christophe-name')}
        >
          CHRISTOPHE JAMES CLARK
          {/* Resize handle */}
          {isEditMode && selectedElement === 'christophe-name' && (
            <div
              style={{
                position: 'absolute',
                bottom: '-10px',
                right: '-10px',
                width: '20px',
                height: '20px',
                background: '#ff6b35',
                border: '2px solid white',
                borderRadius: '50%',
                cursor: 'nw-resize',
                zIndex: 10
              }}
            />
          )}
        </div>

        {/* Description Text */}
        <div
          data-element-id="description-text"
          className={`editable-element ${selectedElement === 'description-text' ? 'selected' : ''}`}
          style={{
            position: 'absolute',
            left: `${descPos?.left || 50}%`,
            top: `${descPos?.top || 1171}px`,
            width: `${descPos?.width || 800}px`,
            height: `${descPos?.height || 160}px`,
            fontSize: '18px',
            fontFamily: 'serif',
            color: '#cccccc',
            textAlign: 'center',
            lineHeight: '1.4',
            zIndex: 4,
            cursor: isEditMode ? 'move' : 'default',
            border: isEditMode ? '2px dashed #ff6b35' : 'none',
            backgroundColor: selectedElement === 'description-text' ? 'rgba(255, 107, 53, 0.1)' : 'transparent',
            transform: selectedElement === 'description-text' ? 'none' : 'translateX(-50%)'
          }}
          onMouseDown={(e) => handleMouseDown(e, 'description-text')}
        >
          A dedicated public servant committed to serving Ward 3 with integrity,
          experience, and a proven track record of getting things done.
          {/* Resize handle */}
          {isEditMode && selectedElement === 'description-text' && (
            <div
              style={{
                position: 'absolute',
                bottom: '-10px',
                right: '-10px',
                width: '20px',
                height: '20px',
                background: '#ff6b35',
                border: '2px solid white',
                borderRadius: '50%',
                cursor: 'nw-resize',
                zIndex: 10
              }}
            />
          )}
        </div>

        {/* Contact Text */}
        <div
          data-element-id="contact-text"
          className={`editable-element ${selectedElement === 'contact-text' ? 'selected' : ''}`}
          style={{
            position: 'absolute',
            left: `${contactPos?.left || 50}%`,
            top: `${contactPos?.top || 1364}px`,
            width: `${contactPos?.width || 400}px`,
            height: `${contactPos?.height || 20}px`,
            fontSize: '16px',
            fontFamily: 'serif',
            color: 'white',
            textAlign: 'center',
            zIndex: 4,
            cursor: isEditMode ? 'move' : 'default',
            border: isEditMode ? '2px dashed #ff6b35' : 'none',
            backgroundColor: selectedElement === 'contact-text' ? 'rgba(255, 107, 53, 0.1)' : 'transparent',
            transform: selectedElement === 'contact-text' ? 'none' : 'translateX(-50%)'
          }}
          onMouseDown={(e) => handleMouseDown(e, 'contact-text')}
        >
          Please connect with me to share your concerns about Sheridan and learn more about your candidate
          {/* Resize handle */}
          {isEditMode && selectedElement === 'contact-text' && (
            <div
              style={{
                position: 'absolute',
                bottom: '-10px',
                right: '-10px',
                width: '20px',
                height: '20px',
                background: '#ff6b35',
                border: '2px solid white',
                borderRadius: '50%',
                cursor: 'nw-resize',
                zIndex: 10
              }}
            />
          )}
        </div>

        {/* Contact Info */}
        <div
          data-element-id="contact-info"
          className={`editable-element ${selectedElement === 'contact-info' ? 'selected' : ''}`}
          style={{
            position: 'absolute',
            left: `${infoPos?.left || 50}%`,
            top: `${infoPos?.top || 1400}px`,
            width: `${infoPos?.width || 500}px`,
            height: `${infoPos?.height || 20}px`,
            fontSize: '16px',
            fontFamily: 'serif',
            color: 'white',
            textAlign: 'center',
            zIndex: 4,
            cursor: isEditMode ? 'move' : 'default',
            border: isEditMode ? '2px dashed #ff6b35' : 'none',
            backgroundColor: selectedElement === 'contact-info' ? 'rgba(255, 107, 53, 0.1)' : 'transparent',
            transform: selectedElement === 'contact-info' ? 'none' : 'translateX(-50%)'
          }}
          onMouseDown={(e) => handleMouseDown(e, 'contact-info')}
        >
          CELL 7202443927 | EMAIL Masterclarketaichi@gmail.com
          {/* Resize handle */}
          {isEditMode && selectedElement === 'contact-info' && (
            <div
              style={{
                position: 'absolute',
                bottom: '-10px',
                right: '-10px',
                width: '20px',
                height: '20px',
                background: '#ff6b35',
                border: '2px solid white',
                borderRadius: '50%',
                cursor: 'nw-resize',
                zIndex: 10
              }}
            />
          )}
        </div>
      </div>

      {/* CSS for editor styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .editable-element:hover {
            outline: 1px solid rgba(255, 107, 53, 0.5);
          }

          .editable-element.selected {
            outline: 2px solid #ff6b35 !important;
            box-shadow: 0 0 10px rgba(255, 107, 53, 0.5);
          }

          .star-element:hover {
            background-color: rgba(255, 255, 255, 0.8) !important;
          }

          .star-element.selected {
            background-color: rgba(255, 107, 53, 0.8) !important;
          }
        `
      }} />
    </div>
  );
};

export default ClarkCampaignCard;