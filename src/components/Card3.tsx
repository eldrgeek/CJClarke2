
import React from 'react';


// Card3 Configuration - All element properties defined here
const CARD3_CONFIG = {
  starSize: "60px",
  frame: {
    left: 46,
    top: 260,
    width: 525,
    height: 790
  },
  vote: {
    text: "VOTE",
    fontSize: "300px",
    left: 646,
    top: 378,
    width: 1191,
    height: 234
  },
  clark: {
    text: "CLARK",
    fontSize: "400px",
    left: 661,
    top: 653,
    width: 1191,
    height: 237
  },
  caption: {
    text: "Christophe James Clark",
    fontSize: "20px",
    left: 20,
    top: 1099,
    width: 490,
    height: 30
  },
  cityCouncil: {
    text: "City Council | Ward 3",
    fontSize: "18px",
    left: 1060,
    top: 941,
    width: 433,
    height: 21
  },
  description: {
    text: "A dedicated public servant committed to serving Ward 3 with integrity, experience, and a proven track record of getting things done.",
    fontSize: "16px",
    left: 140,
    top: 1160,
    width: 1584,
    height: 98
  },
  contactText: {
    text: "Please connect with me to share your concerns about Sheridan and learn more about your candidate",
    fontSize: "12px",
    left: 97,
    top: 1327,
    width: 1780,
    height: 25
  },
  contactInfo: {
    text: "CELL 7202443927 | EMAIL Masterclarketaichi@gmail.com",
    fontSize: "14px",
    left: 791,
    top: 1410,
    width: 500,
    height: 20
  }
};

const ClarkCampaignCard = () => {

  // Generate star positions for two rows using configuration
  const generateStars = (row: number) => {
    const stars = [];
    const starSpacing = 2000 / 25; // Distribution across horizontal space

    for (let i = 0; i < 25; i++) {
      const x = i * starSpacing + starSpacing / 2; // Center each star in its spacing
      const y = row === 1 ? 91 + 54.5 : 91 + 54.5 + 55; // Two rows: 91-145.5 and 146.5-201

      stars.push(
        <div
          key={`star-${row}-${i}`}
          style={{
            position: 'absolute',
            left: `${x}px`,
            top: `${y}px`,
            width: CARD3_CONFIG.starSize,
            height: CARD3_CONFIG.starSize,
            backgroundColor: 'white',
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
          }}
        />
      );
    }
    return stars;
  };





  return (
    <div>
      {/* Static Card Design - No Interactive Editing */}

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
          style={{
            position: 'absolute',
            left: `${CARD3_CONFIG.frame.left}px`,
            top: `${CARD3_CONFIG.frame.top}px`,
            width: `${CARD3_CONFIG.frame.width}px`,
            height: `${CARD3_CONFIG.frame.height}px`,
            backgroundColor: 'white',
            padding: '40px',
            boxSizing: 'border-box',
            zIndex: 3
          }}
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
        </div>

        {/* "CLARK" Text */}
        <div
          style={{
            position: 'absolute',
            left: `${CARD3_CONFIG.clark.left}px`,
            top: `${CARD3_CONFIG.clark.top}px`,
            width: `${CARD3_CONFIG.clark.width}px`,
            height: `${CARD3_CONFIG.clark.height}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: CARD3_CONFIG.clark.fontSize,
            fontWeight: 'bold',
            color: '#fe0100',
            textAlign: 'center',
            fontFamily: 'serif',
            WebkitTextStroke: '3px white',
            whiteSpace: 'nowrap',
            padding: '0',
            margin: '0',
            lineHeight: '1',
            zIndex: 4
          }}
        >
          {CARD3_CONFIG.clark.text}
        </div>

        {/* "VOTE" Text */}
        <div
          style={{
            position: 'absolute',
            left: `${CARD3_CONFIG.vote.left}px`,
            top: `${CARD3_CONFIG.vote.top}px`,
            width: `${CARD3_CONFIG.vote.width}px`,
            height: `${CARD3_CONFIG.vote.height}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: CARD3_CONFIG.vote.fontSize,
            fontWeight: 'bold',
            fontFamily: 'serif',
            color: 'white',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            padding: '0',
            margin: '0',
            lineHeight: '1',
            zIndex: 4
          }}
        >
          {CARD3_CONFIG.vote.text}
        </div>

        {/* "City council | Ward 3" Text */}
        <div
          style={{
            position: 'absolute',
            left: `${CARD3_CONFIG.cityCouncil.left}px`,
            top: `${CARD3_CONFIG.cityCouncil.top}px`,
            width: `${CARD3_CONFIG.cityCouncil.width}px`,
            height: `${CARD3_CONFIG.cityCouncil.height}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: CARD3_CONFIG.cityCouncil.fontSize,
            fontFamily: 'serif',
            color: 'white',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            padding: '0',
            margin: '0',
            lineHeight: '1',
            zIndex: 4
          }}
        >
          {CARD3_CONFIG.cityCouncil.text}
        </div>

        {/* "Christophe James Clark" Text */}
        <div
          style={{
            position: 'absolute',
            left: `${CARD3_CONFIG.caption.left}px`,
            top: `${CARD3_CONFIG.caption.top}px`,
            width: `${CARD3_CONFIG.caption.width}px`,
            height: `${CARD3_CONFIG.caption.height}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: CARD3_CONFIG.caption.fontSize,
            fontWeight: 'bold',
            fontFamily: 'serif',
            color: 'white',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            padding: '0',
            margin: '0',
            lineHeight: '1',
            zIndex: 4
          }}
        >
          {CARD3_CONFIG.caption.text}
        </div>

        {/* Description Text */}
        <div
          style={{
            position: 'absolute',
            left: `${CARD3_CONFIG.description.left}px`,
            top: `${CARD3_CONFIG.description.top}px`,
            width: `${CARD3_CONFIG.description.width}px`,
            height: `${CARD3_CONFIG.description.height}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: CARD3_CONFIG.description.fontSize,
            fontFamily: 'serif',
            color: '#cccccc',
            textAlign: 'center',
            lineHeight: '1.2',
            padding: '0',
            margin: '0',
            zIndex: 4
          }}
        >
          {CARD3_CONFIG.description.text}
        </div>

        {/* Contact Text */}
        <div
          style={{
            position: 'absolute',
            left: `${CARD3_CONFIG.contactText.left}px`,
            top: `${CARD3_CONFIG.contactText.top}px`,
            width: `${CARD3_CONFIG.contactText.width}px`,
            height: `${CARD3_CONFIG.contactText.height}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: CARD3_CONFIG.contactText.fontSize,
            fontFamily: 'serif',
            color: 'white',
            textAlign: 'center',
            padding: '0',
            margin: '0',
            lineHeight: '1',
            zIndex: 4
          }}
        >
          {CARD3_CONFIG.contactText.text}
        </div>

        {/* Contact Info */}
        <div
          style={{
            position: 'absolute',
            left: `${CARD3_CONFIG.contactInfo.left}px`,
            top: `${CARD3_CONFIG.contactInfo.top}px`,
            width: `${CARD3_CONFIG.contactInfo.width}px`,
            height: `${CARD3_CONFIG.contactInfo.height}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: CARD3_CONFIG.contactInfo.fontSize,
            fontFamily: 'serif',
            color: 'white',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            padding: '0',
            margin: '0',
            lineHeight: '1',
            zIndex: 4
          }}
        >
          {CARD3_CONFIG.contactInfo.text}
        </div>
      </div>

      {/* CSS for editor styles */}
    </div>
  );
};

export default ClarkCampaignCard;