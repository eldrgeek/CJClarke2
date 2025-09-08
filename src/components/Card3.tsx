
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
  const [editMode, setEditMode] = useState<'move' | 'font' | 'resize'>('move');
  const [controlPanelPosition, setControlPanelPosition] = useState({ x: 50, y: 50 });
  const [isDraggingPanel, setIsDraggingPanel] = useState(false);
  const [panelDragOffset, setPanelDragOffset] = useState({ x: 0, y: 0 });
  const [fontSizes, setFontSizes] = useState<{ [key: string]: number }>({
    'clark-text': 180,
    'vote-text': 120,
    'city-council-text': 18,
    'christophe-name': 20,
    'description-text': 16,
    'contact-text': 12,
    'contact-info': 14,
  });
  const [starSize, setStarSize] = useState({ width: 40, height: 40 }); // Bigger stars
  const [elementPositions, setElementPositions] = useState<ElementPosition[]>([
    { id: 'photo-frame', left: 46, top: 260, width: 525, height: 790 },
    { id: 'clark-text', left: 661, top: 653, width: 1191, height: 237 },
    { id: 'vote-text', left: 646, top: 378, width: 1191, height: 234 },
    { id: 'city-council-text', left: 1060, top: 941, width: 433, height: 21 },
    { id: 'christophe-name', left: 20, top: 1099, width: 490, height: 30 },
    { id: 'description-text', left: 140, top: 1160, width: 1584, height: 98 },
    { id: 'contact-text', left: 97, top: 1327, width: 1780, height: 25 },
    { id: 'contact-info', left: 791, top: 1410, width: 500, height: 20 },
  ]);

  const containerRef = useRef<HTMLDivElement>(null);

  // Generate resizable star positions for two rows with more horizontal space consumption
  const generateStars = (row: number) => {
    const stars = [];
    const starSpacing = 2000 / 25; // Increased from 1900 to 2000px for more horizontal space

    for (let i = 0; i < 25; i++) {
      const x = i * starSpacing + starSpacing / 2; // Center each star in its spacing
      const y = row === 1 ? 91 + 54.5 : 91 + 54.5 + 55; // Two rows: 91-145.5 and 146.5-201

      const starElement = (
        <div
          key={`star-${row}-${i}`}
          data-element-id={`star-${row}-${i}`}
          className={`star-element ${isEditMode ? 'editable-element' : ''} ${selectedElement === `star-${row}-${i}` ? 'selected' : ''}`}
          style={{
            position: 'absolute',
            left: `${x}px`,
            top: `${y}px`,
            width: `${starSize.width}px`,
            height: `${starSize.height}px`,
            backgroundColor: selectedElement === `star-${row}-${i}` ? 'rgba(255, 107, 53, 0.1)' : 'white',
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            cursor: isEditMode ? 'pointer' : 'default',
            border: isEditMode ? '2px dashed #ff6b35' : 'none',
          }}
          onClick={(e) => {
            if (isEditMode) {
              e.stopPropagation();
              setSelectedElement(`star-${row}-${i}`);
            }
          }}
          onMouseDown={(e) => handleMouseDown(e, `star-${row}-${i}`)}
        >
          {/* Resize handle for stars */}
          {isEditMode && editMode === 'resize' && selectedElement === `star-${row}-${i}` && (
            <div
              onMouseDown={(e) => {
                e.stopPropagation();
                handleMouseDown(e, `star-${row}-${i}`, true);
              }}
              style={{
                position: 'absolute',
                bottom: '-15px',
                right: '-15px',
                width: '25px',
                height: '25px',
                background: '#ff6b35',
                border: '3px solid white',
                borderRadius: '50%',
                cursor: 'nw-resize',
                zIndex: 10,
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
            />
          )}
        </div>
      );

      stars.push(starElement);
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

  const handleMouseDown = (e: React.MouseEvent, elementId: string, isResizeHandle: boolean = false) => {
    if (!isEditMode) return;

    e.preventDefault();
    e.stopPropagation();

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Handle star elements differently
    if (elementId.startsWith('star-')) {
      if (editMode === 'resize' && isResizeHandle) {
        setIsResizing(true);
        setResizeStart({ x, y, width: starSize.width, height: starSize.height });
      } else if (editMode === 'move') {
        // Stars can't be moved individually, only resized
        setSelectedElement(elementId);
        return;
      }
      setSelectedElement(elementId);
      return;
    }

    const element = getElementPosition(elementId);
    if (!element) return;

    if (editMode === 'resize' && isResizeHandle) {
      setIsResizing(true);
      setResizeStart({ x, y, width: element.width, height: element.height });
    } else if (editMode === 'move') {
      setIsDragging(true);
      setDragOffset({ x: x - element.left, y: y - element.top });
    }
    setSelectedElement(elementId);
  };

  const handlePanelMouseDown = (e: React.MouseEvent) => {
    if (!isEditMode) return;

    e.preventDefault();
    e.stopPropagation();

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDraggingPanel(true);
    setPanelDragOffset({ x: x - controlPanelPosition.x, y: y - controlPanelPosition.y });
  };

  const handleGlobalMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isDraggingPanel) {
      setControlPanelPosition({
        x: Math.max(0, Math.min(2100 - 300, x - panelDragOffset.x)),
        y: Math.max(0, Math.min(1500 - 200, y - panelDragOffset.y))
      });
    } else if (isDragging && selectedElement && editMode === 'move') {
      updateElementPosition(selectedElement, {
        left: x - dragOffset.x,
        top: y - dragOffset.y
      });
    } else if (isResizing && selectedElement && editMode === 'resize') {
      if (selectedElement.startsWith('star-')) {
        // Handle star resizing
        const newWidth = Math.max(10, Math.min(100, resizeStart.width + (x - resizeStart.x)));
        const newHeight = Math.max(10, Math.min(100, resizeStart.height + (y - resizeStart.y)));
        setStarSize({ width: newWidth, height: newHeight });
      } else {
        // Handle regular element resizing
        const element = getElementPosition(selectedElement);
        if (element) {
          const newWidth = Math.max(50, resizeStart.width + (x - resizeStart.x));
          const newHeight = Math.max(20, resizeStart.height + (y - resizeStart.y));
          updateElementPosition(selectedElement, {
            width: newWidth,
            height: newHeight
          });
        }
      }
    }
  };

  const handleGlobalMouseUp = () => {
    // Always reset drag states, regardless of edit mode
    setIsDragging(false);
    setIsResizing(false);
    setIsDraggingPanel(false);
  };

  // Add global mouse event listeners to prevent drag getting stuck
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      handleGlobalMouseMove(e);
    };

    const handleMouseUp = () => {
      handleGlobalMouseUp();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Safety mechanism: Escape key resets all drag states
        setIsDragging(false);
        setIsResizing(false);
        setIsDraggingPanel(false);
      }
    };

    if (isDraggingPanel || isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDraggingPanel, isDragging, isResizing, panelDragOffset, dragOffset, resizeStart, selectedElement, editMode]);

  const adjustFontSize = (elementId: string, delta: number) => {
    setFontSizes(prev => ({
      ...prev,
      [elementId]: Math.max(8, Math.min(300, prev[elementId] + delta))
    }));
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
      {/* Draggable Control Panel */}
      {isEditMode && (
        <div
          style={{
            position: 'absolute',
            left: `${controlPanelPosition.x}px`,
            top: `${controlPanelPosition.y}px`,
            zIndex: 1000,
            background: isDraggingPanel ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)',
            border: `3px solid ${isDraggingPanel ? '#007bff' : '#333'}`,
            borderRadius: '12px',
            padding: '16px',
            minWidth: '280px',
            boxShadow: isDraggingPanel ? '0 12px 32px rgba(0,123,255,0.3)' : '0 8px 24px rgba(0,0,0,0.4)',
            cursor: isDraggingPanel ? 'grabbing' : 'move',
            transform: isDraggingPanel ? 'scale(1.02)' : 'scale(1)',
            transition: isDraggingPanel ? 'none' : 'all 0.2s ease'
          }}
          onMouseDown={handlePanelMouseDown}
        >
          {/* Drag Handle */}
          <div
            style={{
              height: '20px',
              background: '#333',
              borderRadius: '8px 8px 0 0',
              margin: '-16px -16px 12px -16px',
              cursor: 'move'
            }}
          />

          {/* Mode Selection */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Edit Mode:</div>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
              <button
                onClick={() => setEditMode('move')}
                style={{
                  flex: 1,
                  background: editMode === 'move' ? '#28a745' : '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '8px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Move
              </button>
              <button
                onClick={() => setEditMode('font')}
                style={{
                  flex: 1,
                  background: editMode === 'font' ? '#28a745' : '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '8px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Font Size
              </button>
              <button
                onClick={() => setEditMode('resize')}
                style={{
                  flex: 1,
                  background: editMode === 'resize' ? '#28a745' : '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '8px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Resize
              </button>
            </div>
          </div>

          {/* Selected Element Info */}
          <div style={{ fontSize: '12px', color: '#333', marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>Selected:</strong> {selectedElement || 'None'}
              {selectedElement && (
                <button
                  onClick={() => setSelectedElement(null)}
                  style={{
                    background: '#6c757d',
                    color: 'white',
                    border: 'none',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '10px'
                  }}
                  title="Clear selection"
                >
                  ✕
                </button>
              )}
            </div>
            {selectedElement && (
              <div style={{ marginTop: '4px', fontSize: '11px', color: '#666' }}>
                Size: {Math.round(getElementPosition(selectedElement)?.width || 0)} × {Math.round(getElementPosition(selectedElement)?.height || 0)}
              </div>
            )}
          </div>

          {/* Font Size Controls */}
          {editMode === 'font' && (
            <div style={{ marginBottom: '12px' }}>
              {selectedElement && !selectedElement.startsWith('star-') ? (
                <>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>Font Size:</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={() => selectedElement && adjustFontSize(selectedElement, -2)}
                      style={{
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}
                    >
                      -
                    </button>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', minWidth: '50px', textAlign: 'center' }}>
                      {fontSizes[selectedElement] || 16}px
                    </div>
                    <button
                      onClick={() => selectedElement && adjustFontSize(selectedElement, 2)}
                      style={{
                        background: '#28a745',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}
                    >
                      +
                    </button>
                  </div>
                </>
              ) : selectedElement && selectedElement.startsWith('star-') ? (
                <>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>Star Size:</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={() => setStarSize(prev => ({
                        width: Math.max(10, prev.width - 5),
                        height: Math.max(10, prev.height - 5)
                      }))}
                      style={{
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}
                    >
                      -
                    </button>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', minWidth: '80px', textAlign: 'center' }}>
                      {starSize.width}×{starSize.height}
                    </div>
                    <button
                      onClick={() => setStarSize(prev => ({
                        width: Math.min(100, prev.width + 5),
                        height: Math.min(100, prev.height + 5)
                      }))}
                      style={{
                        background: '#28a745',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}
                    >
                      +
                    </button>
                  </div>
                </>
              ) : (
                <div style={{ fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
                  Select an element to adjust its size
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <button
              onClick={exportPositions}
              style={{
                background: '#007bff',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              📋 Export Positions
            </button>
            <button
              onClick={resetPositions}
              style={{
                background: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              🔄 Reset Positions
            </button>
          </div>

          {/* Instructions */}
          <div style={{
            marginTop: '12px',
            padding: '8px',
            background: '#f8f9fa',
            borderRadius: '6px',
            fontSize: '11px',
            color: '#666'
          }}>
            <strong>Instructions:</strong><br/>
            {editMode === 'move' && 'Click and drag elements to move them'}
            {editMode === 'font' && 'Select an element and use +/- to change font size'}
            {editMode === 'resize' && 'Drag the orange handle to resize elements'}
            <br/><br/>
            <em>💡 Tips:</em><br/>
            • Click ✕ to clear selection<br/>
            • Press <strong>Escape</strong> if drag gets stuck
          </div>
        </div>
      )}

      {/* Enable Edit Mode Toggle (outside the card) */}
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
            left: `${photoPos?.left || 110}px`,
            top: `${photoPos?.top || 373}px`,
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
                bottom: '-15px',
                right: '-15px',
                width: '30px',
                height: '30px',
                background: '#ff6b35',
                border: '3px solid white',
                borderRadius: '50%',
                cursor: 'nw-resize',
                zIndex: 10,
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
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
            left: `${clarkPos?.left || 661}px`,
            top: `${clarkPos?.top || 653}px`,
            width: `${clarkPos?.width || 1191}px`,
            height: `${clarkPos?.height || 237}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: `${fontSizes['clark-text']}px`,
            fontWeight: 'bold',
            color: '#fe0100',
            textAlign: 'center',
            fontFamily: 'serif',
            WebkitTextStroke: '3px white',
            whiteSpace: 'nowrap',
            padding: '0',
            margin: '0',
            lineHeight: '1',
            zIndex: 4,
            cursor: isEditMode ? 'move' : 'default',
            border: isEditMode ? '2px dashed #ff6b35' : 'none',
            backgroundColor: selectedElement === 'clark-text' ? 'rgba(255, 107, 53, 0.1)' : 'transparent'
          }}
          onMouseDown={(e) => handleMouseDown(e, 'clark-text')}
        >
          CLARK
          {/* Resize handle */}
          {isEditMode && editMode === 'resize' && selectedElement === 'clark-text' && (
            <div
              onMouseDown={(e) => handleMouseDown(e, 'clark-text', true)}
              style={{
                position: 'absolute',
                bottom: '-15px',
                right: '-15px',
                width: '30px',
                height: '30px',
                background: '#ff6b35',
                border: '3px solid white',
                borderRadius: '50%',
                cursor: 'nw-resize',
                zIndex: 10,
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
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
            left: `${votePos?.left || 632}px`,
            top: `${votePos?.top || 281}px`,
            width: `${votePos?.width || 1191}px`,
            height: `${votePos?.height || 234}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: `${fontSizes['vote-text']}px`,
            fontWeight: 'bold',
            fontFamily: 'serif',
            color: 'white',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            padding: '0',
            margin: '0',
            lineHeight: '1',
            zIndex: 4,
            cursor: isEditMode ? 'move' : 'default',
            border: isEditMode ? '2px dashed #ff6b35' : 'none',
            backgroundColor: selectedElement === 'vote-text' ? 'rgba(255, 107, 53, 0.1)' : 'transparent'
          }}
          onMouseDown={(e) => handleMouseDown(e, 'vote-text')}
        >
          VOTE
          {/* Resize handle */}
          {isEditMode && editMode === 'resize' && selectedElement === 'vote-text' && (
            <div
              onMouseDown={(e) => handleMouseDown(e, 'vote-text', true)}
              style={{
                position: 'absolute',
                bottom: '-15px',
                right: '-15px',
                width: '30px',
                height: '30px',
                background: '#ff6b35',
                border: '3px solid white',
                borderRadius: '50%',
                cursor: 'nw-resize',
                zIndex: 10,
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
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
            left: `${cityPos?.left || 1060}px`,
            top: `${cityPos?.top || 941}px`,
            width: `${cityPos?.width || 200}px`,
            height: `${cityPos?.height || 40}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: `${fontSizes['city-council-text']}px`,
            fontFamily: 'serif',
            color: 'white',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            padding: '0',
            margin: '0',
            lineHeight: '1',
            zIndex: 4,
            cursor: isEditMode ? 'move' : 'default',
            border: isEditMode ? '2px dashed #ff6b35' : 'none',
            backgroundColor: selectedElement === 'city-council-text' ? 'rgba(255, 107, 53, 0.1)' : 'transparent'
          }}
          onMouseDown={(e) => handleMouseDown(e, 'city-council-text')}
        >
          CITY COUNCIL | WARD 3
          {/* Resize handle */}
          {isEditMode && editMode === 'resize' && selectedElement === 'city-council-text' && (
            <div
              onMouseDown={(e) => handleMouseDown(e, 'city-council-text', true)}
              style={{
                position: 'absolute',
                bottom: '-15px',
                right: '-15px',
                width: '30px',
                height: '30px',
                background: '#ff6b35',
                border: '3px solid white',
                borderRadius: '50%',
                cursor: 'nw-resize',
                zIndex: 10,
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
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
            left: `${namePos?.left || 20}px`,
            top: `${namePos?.top || 1099}px`,
            width: `${namePos?.width || 300}px`,
            height: `${namePos?.height || 40}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: `${fontSizes['christophe-name']}px`,
            fontWeight: 'bold',
            fontFamily: 'serif',
            color: 'white',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            padding: '0',
            margin: '0',
            lineHeight: '1',
            zIndex: 4,
            cursor: isEditMode ? 'move' : 'default',
            border: isEditMode ? '2px dashed #ff6b35' : 'none',
            backgroundColor: selectedElement === 'christophe-name' ? 'rgba(255, 107, 53, 0.1)' : 'transparent'
          }}
          onMouseDown={(e) => handleMouseDown(e, 'christophe-name')}
        >
          CHRISTOPHE JAMES CLARK
          {/* Resize handle */}
          {isEditMode && editMode === 'resize' && selectedElement === 'christophe-name' && (
            <div
              onMouseDown={(e) => handleMouseDown(e, 'christophe-name', true)}
              style={{
                position: 'absolute',
                bottom: '-15px',
                right: '-15px',
                width: '30px',
                height: '30px',
                background: '#ff6b35',
                border: '3px solid white',
                borderRadius: '50%',
                cursor: 'nw-resize',
                zIndex: 10,
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
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
            left: `${descPos?.left || 140}px`,
            top: `${descPos?.top || 1160}px`,
            width: `${descPos?.width || 800}px`,
            height: `${descPos?.height || 160}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: `${fontSizes['description-text']}px`,
            fontFamily: 'serif',
            color: '#cccccc',
            textAlign: 'center',
            lineHeight: '1.2',
            padding: '0',
            margin: '0',
            zIndex: 4,
            cursor: isEditMode ? 'move' : 'default',
            border: isEditMode ? '2px dashed #ff6b35' : 'none',
            backgroundColor: selectedElement === 'description-text' ? 'rgba(255, 107, 53, 0.1)' : 'transparent'
          }}
          onMouseDown={(e) => handleMouseDown(e, 'description-text')}
        >
          A dedicated public servant committed to serving Ward 3 with integrity,
          experience, and a proven track record of getting things done.
          {/* Resize handle */}
          {isEditMode && editMode === 'resize' && selectedElement === 'description-text' && (
            <div
              onMouseDown={(e) => handleMouseDown(e, 'description-text', true)}
              style={{
                position: 'absolute',
                bottom: '-15px',
                right: '-15px',
                width: '30px',
                height: '30px',
                background: '#ff6b35',
                border: '3px solid white',
                borderRadius: '50%',
                cursor: 'nw-resize',
                zIndex: 10,
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
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
            left: `${contactPos?.left || 97}px`,
            top: `${contactPos?.top || 1327}px`,
            width: `${contactPos?.width || 400}px`,
            height: `${contactPos?.height || 20}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: `${fontSizes['contact-text']}px`,
            fontFamily: 'serif',
            color: 'white',
            textAlign: 'center',
            padding: '0',
            margin: '0',
            lineHeight: '1',
            zIndex: 4,
            cursor: isEditMode ? 'move' : 'default',
            border: isEditMode ? '2px dashed #ff6b35' : 'none',
            backgroundColor: selectedElement === 'contact-text' ? 'rgba(255, 107, 53, 0.1)' : 'transparent'
          }}
          onMouseDown={(e) => handleMouseDown(e, 'contact-text')}
        >
          Please connect with me to share your concerns about Sheridan and learn more about your candidate
          {/* Resize handle */}
          {isEditMode && editMode === 'resize' && selectedElement === 'contact-text' && (
            <div
              onMouseDown={(e) => handleMouseDown(e, 'contact-text', true)}
              style={{
                position: 'absolute',
                bottom: '-15px',
                right: '-15px',
                width: '30px',
                height: '30px',
                background: '#ff6b35',
                border: '3px solid white',
                borderRadius: '50%',
                cursor: 'nw-resize',
                zIndex: 10,
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
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
            left: `${infoPos?.left || 791}px`,
            top: `${infoPos?.top || 1391}px`,
            width: `${infoPos?.width || 500}px`,
            height: `${infoPos?.height || 20}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: `${fontSizes['contact-info']}px`,
            fontFamily: 'serif',
            color: 'white',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            padding: '0',
            margin: '0',
            lineHeight: '1',
            zIndex: 4,
            cursor: isEditMode ? 'move' : 'default',
            border: isEditMode ? '2px dashed #ff6b35' : 'none',
            backgroundColor: selectedElement === 'contact-info' ? 'rgba(255, 107, 53, 0.1)' : 'transparent'
          }}
          onMouseDown={(e) => handleMouseDown(e, 'contact-info')}
        >
          CELL 7202443927 | EMAIL Masterclarketaichi@gmail.com
          {/* Resize handle */}
          {isEditMode && editMode === 'resize' && selectedElement === 'contact-info' && (
            <div
              onMouseDown={(e) => handleMouseDown(e, 'contact-info', true)}
              style={{
                position: 'absolute',
                bottom: '-15px',
                right: '-15px',
                width: '30px',
                height: '30px',
                background: '#ff6b35',
                border: '3px solid white',
                borderRadius: '50%',
                cursor: 'nw-resize',
                zIndex: 10,
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
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