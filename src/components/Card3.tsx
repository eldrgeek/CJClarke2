
const ClarkCampaignCard = () => {
  // Generate star positions for two rows
  const generateStars = (row: number) => {
    const stars = [];
    const starSpacing = 1900 / 25; // Distribute 25 stars across 1900px width

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
            width: '10px',
            height: '10px',
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
    <div
      style={{
        width: '2100px',
        height: '1500px',
        backgroundColor: '#01264e', // Navy blue background
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Arial, sans-serif',
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

      {/* Photo Frame (245,105 to 1035,630) */}
      <div
        style={{
          position: 'absolute',
          left: '245px',
          top: '105px',
          width: '790px', // 1035 - 245
          height: '525px', // 630 - 105
          backgroundColor: 'white',
          padding: '40px', // White border (245-284 = 40px)
          boxSizing: 'border-box',
          zIndex: 3,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#01264e', // Blue border (284-294 = 10px, but using navy for blue)
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

      {/* "CLARK" Text (baseline 885-648, width 684-1875) */}
      <div
        style={{
          position: 'absolute',
          left: '684px',
          top: '648px', // Adjusted for baseline positioning
          width: '1191px', // 1875 - 684
          height: '237px', // 885 - 648
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          fontSize: '120px',
          fontWeight: 'bold',
          color: '#fe0100',
          textAlign: 'center',
          WebkitTextStroke: '3px white',
          zIndex: 4,
        }}
      >
        CLARK
      </div>

      {/* "VOTE" Text (baseline 620, top 386, centered above Clark) */}
      <div
        style={{
          position: 'absolute',
          left: '684px',
          top: '386px',
          width: '1191px',
          height: '234px', // 620 - 386
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          fontSize: '80px',
          fontWeight: 'bold',
          fontFamily: 'serif',
          color: 'white',
          textAlign: 'center',
          zIndex: 4,
        }}
      >
        VOTE
      </div>

      {/* "City council | Ward 3" (baseline 971, top 931) */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '931px',
          transform: 'translateX(-50%)',
          fontSize: '24px',
          color: 'white',
          textAlign: 'center',
          zIndex: 4,
        }}
      >
        CITY COUNCIL | WARD 3
      </div>

      {/* "Christophe James Clark" (baseline 1101, centered beneath image) */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '1101px',
          transform: 'translateX(-50%)',
          fontSize: '28px',
          fontWeight: 'bold',
          color: 'white',
          textAlign: 'center',
          zIndex: 4,
        }}
      >
        CHRISTOPHE JAMES CLARK
      </div>

      {/* Additional Text (1171 to 1331) */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '1171px',
          transform: 'translateX(-50%)',
          width: '800px',
          fontSize: '18px',
          color: '#cccccc', // Lighter color
          textAlign: 'center',
          lineHeight: '1.4',
          zIndex: 4,
        }}
      >
        A dedicated public servant committed to serving Ward 3 with integrity,
        experience, and a proven track record of getting things done.
      </div>

      {/* Contact Text (1364 to 1388) */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '1364px',
          transform: 'translateX(-50%)',
          fontSize: '16px',
          color: 'white',
          textAlign: 'center',
          zIndex: 4,
        }}
      >
        Please connect with me to share your concerns about Sheridan and learn more about your candidate
      </div>

      {/* Contact Info */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '1400px',
          transform: 'translateX(-50%)',
          fontSize: '16px',
          color: 'white',
          textAlign: 'center',
          zIndex: 4,
        }}
      >
        CELL 7202443927 | EMAIL Masterclarketaichi@gmail.com
      </div>
    </div>
  );
};

export default ClarkCampaignCard;