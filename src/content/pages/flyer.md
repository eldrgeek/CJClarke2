---
type: "page"
slug: "/flyer"
title: "Campaign Flyer - 8.5x11"
summary: "Official CJ Clarke for City Council campaign flyer"
hero:
  image: "https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg"
  alt: "CJ Clarke campaign flyer"
seo:
  description: "Official CJ Clarke for Sheridan City Council campaign flyer"
---

# CJ Clarke Campaign Flyer

<div class="flyer-container">
  <div class="flyer-content">
    <!-- Header -->
    <div class="flyer-header">
      <div class="flag-stripes">
        <div class="red-stripe"></div>
        <div class="white-stripe"></div>
        <div class="blue-stripe"></div>
      </div>
      <h1 class="flyer-title">VOTE CLARKE</h1>
      <h2 class="flyer-subtitle">For Sheridan City Council</h2>
    </div>

    <!-- Main Content -->
    <div class="flyer-main">
      <div class="hero-section">
        <img src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg"
             alt="Christophe James Clarke"
             class="cj-photo" />
        <div class="hero-text">
          <h3>CHRISTOPHE JAMES CLARKE</h3>
          <p class="hero-description">
            U.S. Army Veteran • 3-Time National Gold Medalist<br>
            Business Owner • Community Leader
          </p>
        </div>
      </div>

      <div class="message-section">
        <h4>A Healthier, Safer Sheridan</h4>
        <p class="main-message">
          As a U.S. Army veteran, world champion athlete, and successful business owner
          through my Chi Life Movement, I've dedicated my life to service and excellence.
          Now I bring that same commitment to City Council.
        </p>

        <div class="key-points">
          <div class="point">
            <strong>✓ Safe Streets:</strong> Champion the Safe Streets Through Sheridan plan
          </div>
          <div class="point">
            <strong>✓ Economic Growth:</strong> Build on River Point success for all residents
          </div>
          <div class="point">
            <strong>✓ Youth Programs:</strong> Expand parks, recreation, and opportunities
          </div>
          <div class="point">
            <strong>✓ Fiscal Responsibility:</strong> Transparent budgeting and accountability
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="flyer-footer">
      <div class="contact-info">
        <p><strong>Paid for by CJ Clarke for City Council</strong></p>
        <p>Visit: cjclarkeforcouncil.org | Call: (555) 123-4567</p>
        <p>Email: info@cjclarkeforcouncil.org</p>
      </div>

      <div class="vote-cta">
        <div class="vote-box">
          <h5>VOTE</h5>
          <h6>CLARKE</h6>
          <p>November 5, 2025</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Print Button -->
  <div class="print-controls">
    <button onclick="window.print()" class="print-button">
      🖨️ Print Flyer
    </button>
    <p class="print-instructions">
      Click "Print Flyer" above, then select your printer and paper size (8.5x11)
    </p>
  </div>
</div>

<style>
.flyer-container {
  max-width: 8.5in;
  margin: 0 auto;
  padding: 20px;
  background: white;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.flyer-content {
  width: 8.5in;
  height: 11in;
  background: white;
  border: 2px solid #1E40AF;
  position: relative;
  padding: 0.5in;
  box-sizing: border-box;
}

.flyer-header {
  text-align: center;
  margin-bottom: 30px;
}

.flag-stripes {
  display: flex;
  height: 20px;
  margin-bottom: 20px;
}

.red-stripe { background: #DC2626; flex: 1; }
.white-stripe { background: #FFFFFF; flex: 1; border-left: 1px solid #ccc; border-right: 1px solid #ccc; }
.blue-stripe { background: #1E40AF; flex: 1; }

.flyer-title {
  color: #DC2626;
  font-size: 48px;
  font-weight: bold;
  margin: 10px 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.flyer-subtitle {
  color: #1E40AF;
  font-size: 24px;
  margin: 5px 0;
}

.hero-section {
  display: flex;
  margin-bottom: 30px;
  border: 2px solid #1E40AF;
  padding: 15px;
  background: linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%);
}

.cj-photo {
  width: 200px;
  height: 250px;
  object-fit: cover;
  border: 3px solid #DC2626;
  margin-right: 20px;
}

.hero-text h3 {
  color: #1E40AF;
  font-size: 28px;
  margin: 0 0 10px 0;
}

.hero-description {
  color: #64748B;
  font-size: 16px;
  line-height: 1.4;
}

.message-section {
  margin-bottom: 30px;
}

.message-section h4 {
  color: #DC2626;
  font-size: 24px;
  margin-bottom: 15px;
  text-align: center;
}

.main-message {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
  text-align: justify;
}

.key-points {
  background: #F8FAFC;
  padding: 15px;
  border-left: 5px solid #1E40AF;
}

.point {
  margin-bottom: 8px;
  font-size: 14px;
}

.flyer-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 3px solid #DC2626;
  padding-top: 20px;
}

.contact-info {
  font-size: 12px;
  color: #64748B;
}

.contact-info p {
  margin: 3px 0;
}

.vote-cta {
  text-align: center;
}

.vote-box {
  background: #DC2626;
  color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}

.vote-box h5 {
  font-size: 36px;
  margin: 0;
  font-weight: bold;
}

.vote-box h6 {
  font-size: 28px;
  margin: 5px 0;
  font-weight: bold;
}

.vote-box p {
  font-size: 14px;
  margin: 5px 0;
  opacity: 0.9;
}

.print-controls {
  margin-top: 30px;
  text-align: center;
  padding: 20px;
  background: #F8FAFC;
  border-radius: 8px;
}

.print-button {
  background: #1E40AF;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 10px;
}

.print-button:hover {
  background: #1E3A8A;
}

.print-instructions {
  color: #64748B;
  font-size: 14px;
  margin: 0;
}

/* Print styles */
@media print {
  .print-controls {
    display: none;
  }

  .flyer-container {
    box-shadow: none;
    padding: 0;
  }

  .flyer-content {
    border: none;
    box-shadow: none;
  }
}
</style>
