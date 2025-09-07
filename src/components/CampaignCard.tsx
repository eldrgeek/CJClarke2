import React, { useState } from 'react';

interface CampaignCardProps {
  lang?: string;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ lang = 'en' }) => {
  const [showFront, setShowFront] = useState(true);
  const isSpanish = lang === 'es';

  const handlePrint = () => {
    window.print();
  };

  // Text content based on language
  const content = {
    title: isSpanish ? 'Tarjeta de Campaña de CJ Clark' : 'CJ Clark Campaign Card',
    frontSide: isSpanish ? 'Lado Frontal' : 'Front Side',
    backSide: isSpanish ? 'Lado Trasero' : 'Back Side',
    printCard: isSpanish ? '🖨️ Imprimir Tarjeta' : '🖨️ Print Card',
    vote: 'VOTE',
    clark: 'CLARK',
    christopheName: 'CHRISTOPHE JAMES CLARK',
    veteran: isSpanish ? 'Veterano del Ejército de EE.UU.' : 'U.S. Army Veteran',
    goldMedalist: isSpanish ? '3 Veces Medallista Nacional de Oro' : '3-Time National Gold Medalist',
    businessLeader: isSpanish ? 'Propietario de Negocio & Líder Comunitario' : 'Business Owner & Community Leader',
    slogan: isSpanish ? 'Un Sheridan Más Saludable y Seguro' : 'A Healthier, Safer Sheridan',
    electionDate: 'November 5, 2025',
    whyClark: isSpanish ? '¿POR QUÉ CJ CLARK?' : 'WHY CJ CLARK?',
    veteranMessage: isSpanish
      ? 'Como veterano del Ejército de EE.UU. que sirvió en las líneas del frente de la DMZ en Corea, he dedicado mi vida al servicio, la disciplina y la excelencia.'
      : 'As a U.S. Army veteran who served on the front lines of the DMZ in Korea, I\'ve dedicated my life to service, discipline, and excellence.',
    businessMessage: isSpanish
      ? 'A través de mi negocio Chi Life Movement, he ayudado a cientos de jóvenes y adultos mayores en Sheridan a construir vidas más saludables y confiadas.'
      : 'Through my Chi Life Movement business, I\'ve helped hundreds of youth and seniors in Sheridan build healthier, more confident lives.',
    commitmentsTitle: isSpanish ? 'MIS COMPROMISOS' : 'MY COMMITMENTS',
    streets: isSpanish ? 'Calles más seguras y mejor infraestructura' : 'Safer Streets & Better Infrastructure',
    housing: isSpanish ? 'Vivienda asequible para todos' : 'Affordable Housing for All',
    business: isSpanish ? 'Apoyo a pequeños negocios locales' : 'Support for Local Small Businesses',
    youth: isSpanish ? 'Programas juveniles y recreación' : 'Youth Programs & Recreation',
    contactInfo: isSpanish ? 'Información de Contacto' : 'Contact Information',
    website: 'cjclarkeforcouncil.org',
    phone: '(555) 123-4567',
    paidForBy: isSpanish ? 'Pagado por CJ Clark para el Concejo Municipal' : 'Paid for by CJ Clark for City Council',
    printingInstructions: isSpanish ? 'Instrucciones de Impresión:' : 'Printing Instructions:',
    printStep1: isSpanish ? '1. Haga clic en "Imprimir Tarjeta" arriba' : '1. Click "Print Card" above',
    printStep2: isSpanish ? '2. Seleccione tamaño de papel: 5x7 pulgadas' : '2. Select paper size: 5x7 inches',
    printStep3: isSpanish ? '3. Imprima el lado frontal primero, luego voltee el papel e imprima el lado trasero' : '3. Print front side first, then flip paper and print back side',
    printStep4: isSpanish ? '4. O use una impresora dúplex para impresión automática a doble cara' : '4. Or use a duplex printer for automatic double-sided printing'
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-cj-blue mb-4">{content.title}</h1>

        {/* Card Controls */}
        <div className="flex justify-center gap-4 mb-4 print:hidden">
          <button
            onClick={() => setShowFront(true)}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              showFront
                ? 'bg-cj-blue text-white'
                : 'bg-cj-gray-100 text-cj-blue border-2 border-cj-blue'
            }`}
          >
            {content.frontSide}
          </button>
          <button
            onClick={() => setShowFront(false)}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              !showFront
                ? 'bg-cj-blue text-white'
                : 'bg-cj-gray-100 text-cj-blue border-2 border-cj-blue'
            }`}
          >
            {content.backSide}
          </button>
          <button
            onClick={handlePrint}
            className="bg-cj-red text-white px-6 py-2 rounded-lg font-semibold hover:bg-cj-red/90 transition-colors flex items-center gap-2"
          >
            {content.printCard}
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="card-container bg-white shadow-lg mx-auto border-2 border-cj-blue print:shadow-none print:border-none" style={{maxWidth: '5in'}}>
        {showFront ? (
          /* Front Side */
          <div className="card-side p-4">
            {/* Header */}
            <div className="card-header text-center mb-6">
              <div className="flag-stripes flex h-4 mb-4">
                <div className="bg-cj-red flex-1"></div>
                <div className="bg-cj-white flex-1 border-l border-r border-gray-300"></div>
                <div className="bg-cj-blue flex-1"></div>
              </div>
              <h1 className="text-4xl font-bold text-cj-red mb-2" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.3)'}}>{content.vote}</h1>
              <h2 className="text-3xl font-bold text-cj-blue">{content.clark}</h2>
            </div>

            {/* Main Content */}
            <div className="card-main mb-6">
              <div className="hero-section flex items-center bg-gradient-to-br from-white to-cj-gray-50 p-4 rounded-lg border border-cj-blue">
                <img
                  src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg"
                  alt="Christophe James Clark"
                  className="cj-photo w-32 h-40 object-cover border-3 border-cj-red mr-4"
                />
                <div className="candidate-info flex-1">
                  <h3 className="text-lg font-bold text-cj-blue mb-2">{content.christopheName}</h3>
                  <p className="text-xs text-cj-gray-900 leading-relaxed">
                    {content.veteran}
                    <br />
                    {content.goldMedalist}
                    <br />
                    {content.businessLeader}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="card-footer text-center border-t-2 border-cj-red pt-4">
              <p className="text-lg font-bold text-cj-red mb-1">{content.slogan}</p>
              <p className="text-sm text-cj-blue">{content.electionDate}</p>
            </div>
          </div>
        ) : (
          /* Back Side */
          <div className="card-side p-4">
            {/* Header */}
            <div className="back-header text-center mb-6 border-b-2 border-cj-red pb-2">
              <h1 className="text-2xl font-bold text-cj-blue">{content.whyClark}</h1>
            </div>

            {/* Message Section */}
            <div className="message-section mb-6">
              <p className="text-xs leading-relaxed mb-3 text-justify">
                {content.veteranMessage}
              </p>

              <p className="text-xs leading-relaxed mb-4 text-justify">
                {content.businessMessage}
              </p>

              <div className="key-commitments bg-cj-gray-50 p-3 rounded-lg mb-4">
                <h4 className="text-sm font-bold text-cj-blue mb-2">{content.commitmentsTitle}:</h4>
                <ul className="text-xs space-y-1 pl-4">
                  <li className="text-green-600">✓ {content.streets}</li>
                  <li className="text-green-600">✓ {content.housing}</li>
                  <li className="text-green-600">✓ {content.business}</li>
                  <li className="text-green-600">✓ {content.youth}</li>
                  <li className="text-green-600">✓ {isSpanish ? 'Transparencia: Responsabilidad fiscal y rendición de cuentas' : 'Transparency: Fiscal responsibility and accountability'}</li>
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="back-footer flex justify-between items-end border-t-2 border-cj-red pt-4">
              <div className="contact-info text-xs text-cj-gray-900 max-w-3/5">
                <p className="font-bold">{content.paidForBy}</p>
                <p>{content.website}</p>
                <p>{content.phone}</p>
              </div>

              <div className="final-cta text-center bg-cj-red text-white p-3 rounded-lg">
                <h5 className="text-lg font-bold mb-1">VOTE {content.clark}</h5>
                <p className="text-xs opacity-90">{content.electionDate}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Print Instructions */}
      <div className="mt-8 bg-cj-gray-50 p-6 rounded-lg text-center print:hidden">
        <h4 className="text-lg font-bold text-cj-blue mb-4">{content.printingInstructions}</h4>
        <div className="text-sm text-cj-gray-900 space-y-2">
          <p>{content.printStep1}</p>
          <p>{content.printStep2}</p>
          <p>{content.printStep3}</p>
          <p>{content.printStep4}</p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            .card-container {
              box-shadow: none !important;
              margin: 0 !important;
              border: none !important;
              max-width: none !important;
            }

            .card-side {
              width: 5in !important;
              min-height: 7in !important;
              padding: 0.4in !important;
              box-sizing: border-box !important;
              margin: 0 auto !important;
              page-break-inside: avoid !important;
            }

            .card-header,
            .card-main,
            .card-footer,
            .back-header,
            .message-section,
            .back-footer {
              page-break-inside: avoid !important;
            }

            button, .card-controls, .print-instructions {
              display: none !important;
            }

            body {
              margin: 0 !important;
              padding: 0 !important;
            }

            @page {
              size: 5in 7in;
              margin: 0.25in;
            }
          }

          @media (max-width: 768px) {
            .card-container {
              max-width: 100% !important;
              padding: 1rem !important;
            }

            .card-side {
              width: 100% !important;
              min-height: auto !important;
              padding: 1rem !important;
            }

            .hero-section {
              flex-direction: column !important;
              text-align: center !important;
            }

            .cj-photo {
              margin-right: 0 !important;
              margin-bottom: 1rem !important;
            }
          }
        `
      }} />
    </div>
  );
};

export default CampaignCard;