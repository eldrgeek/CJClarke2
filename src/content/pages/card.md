---
type: "page"
slug: "/card"
title: "Campaign Card - 5x7 Mail Piece"
summary: "Official CJ Clarke for City Council campaign card"
hero:
  image: "https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg"
  alt: "CJ Clarke campaign card"
seo:
  description: "Official CJ Clarke for Sheridan City Council campaign card"
---

# CJ Clarke Campaign Card

<div class="card-container">
  <div class="card-controls">
    <button onclick="showFront()" class="card-button active" id="frontBtn">Front Side</button>
    <button onclick="showBack()" class="card-button" id="backBtn">Back Side</button>
    <button onclick="window.print()" class="print-button">
      🖨️ Print Card
    </button>
  </div>

  <div class="card-content">
    <!-- Front of Card -->
    <div class="card-side front-side" id="frontSide">
      <div class="card-header">
        <div class="flag-stripes">
          <div class="red-stripe"></div>
          <div class="white-stripe"></div>
          <div class="blue-stripe"></div>
        </div>
        <h1 class="card-title">VOTE</h1>
        <h2 class="card-subtitle">CLARKE</h2>
      </div>

      <div class="card-main">
        <img src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg"
             alt="Christophe James Clarke"
             class="cj-photo" />
        <div class="candidate-info">
          <h3>CHRISTOPHE JAMES CLARKE</h3>
          <p class="credentials">
            U.S. Army Veteran<br>
            3-Time National Gold Medalist<br>
            Business Owner & Community Leader
          </p>
        </div>
      </div>

      <div class="card-footer">
        <p class="tagline">A Healthier, Safer Sheridan</p>
        <p class="election-date">November 5, 2025</p>
      </div>
    </div>

    <!-- Back of Card -->
    <div class="card-side back-side" id="backSide" style="display: none;">
      <div class="back-header">
        <h1 class="back-title">WHY CJ CLARKE?</h1>
      </div>

      <div class="message-section">
        <p class="back-message">
          As a U.S. Army veteran who served on the front lines of the DMZ in Korea,
          I've dedicated my life to service, discipline, and excellence.
        </p>

        <p class="back-message">
          Through my Chi Life Movement business, I've helped hundreds of youth and seniors
          in Sheridan build healthier, more confident lives.
        </p>

        <div class="key-commitments">
          <h4>My Commitments to Sheridan:</h4>
          <ul>
            <li>✓ Champion the Safe Streets Through Sheridan Plan</li>
            <li>✓ Support ADUs and affordable housing solutions</li>
            <li>✓ Build on River Point's economic success</li>
            <li>✓ Expand youth programs and senior services</li>
            <li>✓ Ensure fiscal responsibility and transparency</li>
          </ul>
        </div>
      </div>

      <div class="back-footer">
        <div class="contact-info">
          <p><strong>Paid for by CJ Clarke for City Council</strong></p>
          <p>cjclarkeforcouncil.org</p>
          <p>(555) 123-4567</p>
        </div>

        <div class="final-cta">
          <h5>VOTE CLARKE</h5>
          <p>November 5, 2025</p>
        </div>
      </div>
    </div>
  </div>

  <div class="print-instructions">
    <h4>Printing Instructions:</h4>
    <p>1. Click "Print Card" above</p>
    <p>2. Select paper size: 5x7 inches</p>
    <p>3. Print front side first, then flip paper and print back side</p>
    <p>4. Or use a duplex printer for automatic double-sided printing</p>
  </div>
</div>

<script>
function showFront() {
  document.getElementById('frontSide').style.display = 'block';
  document.getElementById('backSide').style.display = 'none';
  document.getElementById('frontBtn').classList.add('active');
  document.getElementById('backBtn').classList.remove('active');
}

function showBack() {
  document.getElementById('frontSide').style.display = 'none';
  document.getElementById('backSide').style.display = 'block';
  document.getElementById('backBtn').classList.add('active');
  document.getElementById('frontBtn').classList.remove('active');
}
</script>

<style>
.card-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.card-controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
}

.card-button {
  background: #F8FAFC;
  border: 2px solid #1E40AF;
  color: #1E40AF;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.card-button.active {
  background: #1E40AF;
  color: white;
}

.print-button {
  background: #DC2626;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  margin-left: 20px;
}

.print-button:hover {
  background: #B91C1C;
}

.card-content {
  background: white;
  border: 2px solid #1E40AF;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

.card-side {
  width: 5in;
  height: 7in;
  padding: 0.4in;
  box-sizing: border-box;
  margin: 0 auto;
}

/* Front Side Styles */
.card-header {
  text-align: center;
  margin-bottom: 20px;
}

.flag-stripes {
  display: flex;
  height: 15px;
  margin-bottom: 15px;
}

.red-stripe { background: #DC2626; flex: 1; }
.white-stripe { background: #FFFFFF; flex: 1; border-left: 1px solid #ccc; border-right: 1px solid #ccc; }
.blue-stripe { background: #1E40AF; flex: 1; }

.card-title {
  color: #DC2626;
  font-size: 36px;
  font-weight: bold;
  margin: 5px 0;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.card-subtitle {
  color: #1E40AF;
  font-size: 28px;
  font-weight: bold;
  margin: 5px 0;
}

.card-main {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%);
  padding: 15px;
  border-radius: 8px;
}

.cj-photo {
  width: 150px;
  height: 180px;
  object-fit: cover;
  border: 3px solid #DC2626;
  margin-right: 15px;
}

.candidate-info h3 {
  color: #1E40AF;
  font-size: 20px;
  margin: 0 0 10px 0;
}

.credentials {
  color: #64748B;
  font-size: 12px;
  line-height: 1.4;
  margin: 0;
}

.card-footer {
  text-align: center;
  border-top: 2px solid #DC2626;
  padding-top: 15px;
}

.tagline {
  color: #DC2626;
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 5px 0;
}

.election-date {
  color: #1E40AF;
  font-size: 14px;
  margin: 0;
}

/* Back Side Styles */
.back-header {
  text-align: center;
  margin-bottom: 20px;
  border-bottom: 2px solid #DC2626;
  padding-bottom: 10px;
}

.back-title {
  color: #1E40AF;
  font-size: 24px;
  margin: 0;
}

.message-section {
  margin-bottom: 20px;
}

.back-message {
  font-size: 12px;
  line-height: 1.4;
  margin-bottom: 10px;
  text-align: justify;
}

.key-commitments {
  background: #F8FAFC;
  padding: 10px;
  border-radius: 6px;
  margin-top: 15px;
}

.key-commitments h4 {
  color: #1E40AF;
  font-size: 14px;
  margin: 0 0 8px 0;
}

.key-commitments ul {
  margin: 0;
  padding-left: 15px;
}

.key-commitments li {
  font-size: 11px;
  margin-bottom: 3px;
  color: #64748B;
}

.back-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-top: 2px solid #DC2626;
  padding-top: 15px;
}

.contact-info {
  font-size: 9px;
  color: #64748B;
  max-width: 60%;
}

.contact-info p {
  margin: 2px 0;
}

.final-cta {
  text-align: center;
  background: #DC2626;
  color: white;
  padding: 10px 15px;
  border-radius: 6px;
}

.final-cta h5 {
  font-size: 18px;
  margin: 0 0 3px 0;
  font-weight: bold;
}

.final-cta p {
  font-size: 10px;
  margin: 0;
  opacity: 0.9;
}

.print-instructions {
  background: #F8FAFC;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.print-instructions h4 {
  color: #1E40AF;
  margin: 0 0 15px 0;
}

.print-instructions p {
  color: #64748B;
  margin: 5px 0;
  font-size: 14px;
}

/* Print styles */
@media print {
  .card-controls,
  .print-instructions {
    display: none;
  }

  .card-content {
    box-shadow: none;
    border: none;
  }

  .card-side {
    page-break-after: always;
  }

  .back-side {
    display: block !important;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .card-side {
    width: 100%;
    height: auto;
    min-height: 7in;
    padding: 0.3in;
  }

  .card-main {
    flex-direction: column;
    text-align: center;
  }

  .cj-photo {
    margin-right: 0;
    margin-bottom: 15px;
  }
}
</style>
