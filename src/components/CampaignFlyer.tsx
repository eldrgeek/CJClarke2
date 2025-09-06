import React from 'react';

const CampaignFlyer: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-cj-blue mb-4">CJ Clarke Campaign Flyer</h1>
        <button
          onClick={handlePrint}
          className="bg-cj-red text-cj-white px-6 py-3 rounded-lg font-semibold hover:bg-cj-red/90 transition-colors flex items-center gap-2 mx-auto print:hidden"
        >
          🖨️ Print Flyer
        </button>
        <p className="text-cj-gray-900 mt-2 text-sm print:hidden">
          Click "Print Flyer" above, then select your printer and paper size (8.5x11)
        </p>
      </div>

      {/* Flyer Content */}
      <div className="flyer-container bg-white shadow-lg mx-auto print:shadow-none">
        <div className="flyer-content border-2 border-cj-blue print:border-none print:shadow-none">
          {/* Header */}
          <div className="flyer-header text-center mb-8">
            <div className="flag-stripes flex h-5 mb-5">
              <div className="bg-cj-red flex-1"></div>
              <div className="bg-cj-white flex-1 border-l border-r border-gray-300"></div>
              <div className="bg-cj-blue flex-1"></div>
            </div>
            <h1 className="flyer-title text-5xl font-bold text-cj-red mb-2" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
              VOTE CLARKE
            </h1>
            <h2 className="flyer-subtitle text-2xl text-cj-blue">
              For Sheridan City Council
            </h2>
          </div>

          {/* Main Content */}
          <div className="flyer-main mb-8">
            <div className="hero-section flex border-2 border-cj-blue p-4 bg-gradient-to-br from-white to-cj-gray-50 rounded-lg">
              <img
                src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg"
                alt="Christophe James Clarke"
                className="cj-photo w-48 h-60 object-cover border-4 border-cj-red mr-5"
              />
              <div className="hero-text flex-1">
                <h3 className="text-2xl font-bold text-cj-blue mb-3">CHRISTOPHE JAMES CLARKE</h3>
                <p className="text-cj-gray-900 text-sm leading-relaxed">
                  U.S. Army Veteran • World Champion Athlete
                  <br />
                  Business Owner • Community Leader
                </p>
              </div>
            </div>

            <div className="message-section mt-6">
              <h4 className="text-xl font-bold text-cj-red mb-3 text-center">
                A Healthier, Safer Sheridan
              </h4>
              <p className="text-sm leading-relaxed mb-4 text-justify">
                As a U.S. Army veteran, world champion athlete, and successful business owner
                through my Chi Life Movement, I've dedicated my life to service and excellence.
                Now I bring that same commitment to City Council.
              </p>

              <div className="key-points bg-cj-gray-50 p-4 border-l-4 border-cj-blue">
                <div className="point mb-2 text-sm">
                  <span className="text-green-600 font-bold">✓</span> <strong>Safe Streets:</strong> Champion the Safe Streets Through Sheridan plan
                </div>
                <div className="point mb-2 text-sm">
                  <span className="text-green-600 font-bold">✓</span> <strong>Economic Growth:</strong> Build on River Point success for all residents
                </div>
                <div className="point mb-2 text-sm">
                  <span className="text-green-600 font-bold">✓</span> <strong>Youth Programs:</strong> Expand parks, recreation, and opportunities
                </div>
                <div className="point text-sm">
                  <span className="text-green-600 font-bold">✓</span> <strong>Fiscal Responsibility:</strong> Transparent budgeting and accountability
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flyer-footer flex justify-between items-center border-t-4 border-cj-red pt-4">
            <div className="contact-info text-xs text-cj-gray-900">
              <p className="font-bold">Paid for by CJ Clarke for City Council</p>
              <p>Visit: cjclarkeforcouncil.org | Call: (555) 123-4567</p>
              <p>Email: info@cjclarkeforcouncil.org</p>
            </div>

            <div className="vote-cta text-center">
              <div className="vote-box bg-cj-red text-white p-4 rounded-lg shadow-lg">
                <h5 className="text-3xl font-bold mb-1">VOTE</h5>
                <h6 className="text-2xl font-bold mb-2">CLARKE</h6>
                <p className="text-sm opacity-90">November 5, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignFlyer;