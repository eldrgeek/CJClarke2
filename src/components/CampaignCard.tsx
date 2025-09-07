import React, { useState } from 'react';
import Card3 from './Card3';

interface CampaignCardProps {
  lang?: string;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ lang = 'en' }) => {
  const [showFront, setShowFront] = useState(true);
  const isSpanish = lang === 'es';

  const handlePrint = () => {
    // Create a print-specific stylesheet
    const printStyle = document.createElement('style');
    printStyle.innerHTML = `
      @media print {
        body * { visibility: hidden; }
        #card-content, #card-content * { visibility: visible; }
        #card-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 7in;  /* 2100px at 300 DPI = 7 inches */
          height: 5in; /* 1500px at 300 DPI = 5 inches */
        }
        /* Remove scaling for print - show Card3 at full resolution */
        #card-content > div > div > div {
          transform: none !important;
          width: 2100px !important;
          height: 1500px !important;
        }
        /* Ensure Card3 background is preserved */
        #card-content [style*="background-color: #01264e"] {
          background-color: #01264e !important;
        }
        /* Force single page printing */
        .card-side {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }
      }
    `;
    document.head.appendChild(printStyle);

    // Print
    window.print();

    // Remove the print style after printing
    setTimeout(() => {
      document.head.removeChild(printStyle);
    }, 1000);
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
      <div id="card-content" className="card-container bg-white shadow-lg mx-auto border-2 border-gray-300 print:shadow-none print:border-none" style={{maxWidth: '5in'}}>
        {showFront ? (
          /* Front Side - Card3 Design */
          <div className="card-side relative overflow-hidden" style={{width: '5in', height: '7in'}}>
            {/* Scale Card3 to fit within the 5x7 inch container for screen viewing */}
            <div style={{
              width: '5in',
              height: '7in',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                transform: 'scale(0.2286)', // Scale 2100px down to fit in 5in (5*96=480px, 2100*0.2286≈479px)
                transformOrigin: 'top left',
                width: '2100px',
                height: '1500px'
              }}>
                <Card3 />
              </div>
            </div>
          </div>
        ) : (
          /* Back Side - Professional Campaign Design */
          <div className="card-side relative" style={{width: '5in', height: '7in'}}>
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>

            {/* Header */}
            <div className="relative z-10 p-6">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-cj-blue mb-2">{content.whyClark}</h1>
                <div className="w-16 h-1 bg-cj-red mx-auto rounded-full"></div>
              </div>

              {/* Candidate Bio */}
              <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-cj-blue mb-3 text-center">{content.christopheName}</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-cj-red rounded-full mr-3 flex-shrink-0"></span>
                    <span>{content.veteran}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-cj-blue rounded-full mr-3 flex-shrink-0"></span>
                    <span>{content.goldMedalist}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-cj-red rounded-full mr-3 flex-shrink-0"></span>
                    <span>{content.businessLeader}</span>
                  </div>
                </div>
              </div>

              {/* Key Commitments */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-cj-blue mb-3 text-center uppercase tracking-wide">{content.commitmentsTitle}</h4>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center bg-red-50 p-2 rounded border-l-4 border-cj-red">
                    <span className="text-cj-red mr-2">✓</span>
                    <span className="text-xs font-medium">{content.streets}</span>
                  </div>
                  <div className="flex items-center bg-blue-50 p-2 rounded border-l-4 border-cj-blue">
                    <span className="text-cj-blue mr-2">✓</span>
                    <span className="text-xs font-medium">{content.housing}</span>
                  </div>
                  <div className="flex items-center bg-red-50 p-2 rounded border-l-4 border-cj-red">
                    <span className="text-cj-red mr-2">✓</span>
                    <span className="text-xs font-medium">{content.business}</span>
                  </div>
                  <div className="flex items-center bg-blue-50 p-2 rounded border-l-4 border-cj-blue">
                    <span className="text-cj-blue mr-2">✓</span>
                    <span className="text-xs font-medium">{content.youth}</span>
                  </div>
                </div>
              </div>

              {/* Personal Message */}
              <div className="mb-6 bg-gradient-to-r from-cj-blue/5 to-cj-red/5 p-4 rounded-lg border border-gray-200">
                <p className="text-xs leading-relaxed text-gray-700 italic text-center">
                  "{isSpanish ? 'Comprometido con hacer de Sheridan un lugar más saludable y seguro para todos.' : 'Committed to making Sheridan a healthier, safer place for everyone.'}"
                </p>
              </div>

              {/* Contact & Vote CTA */}
              <div className="border-t border-gray-300 pt-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <h5 className="text-sm font-bold text-cj-blue mb-2">{content.contactInfo}</h5>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>📧 {content.website}</p>
                      <p>📞 {content.phone}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-cj-red text-white p-3 rounded-lg shadow-lg">
                      <h4 className="text-lg font-bold mb-1">VOTE</h4>
                      <h5 className="text-xl font-black">{content.clark}</h5>
                      <p className="text-xs opacity-90 mt-1">{content.electionDate}</p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="text-center text-xs text-gray-500 border-t border-gray-200 pt-3">
                  <p>{content.paidForBy}</p>
                </div>
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
              width: 7in !important; /* Updated for Card3 dimensions */
              height: 5in !important; /* Updated for Card3 dimensions */
              padding: 0 !important;
              margin: 0 auto !important;
              page-break-inside: avoid !important;
              break-inside: avoid !important;
              overflow: visible !important;
            }

            @page {
              size: 7in 5in; /* Updated for Card3 dimensions (landscape) */
              margin: 0.25in;
            }

            /* Ensure Card3 background is preserved when printing */
            #card-content div[style*="background-color: #01264e"] {
              background-color: #01264e !important;
            }

            /* Force single page for both front and back sides */
            .card-side {
              page-break-before: avoid !important;
              page-break-after: avoid !important;
              break-before: avoid !important;
              break-after: avoid !important;
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
              size: 7in 5in; /* Updated for Card3 dimensions (landscape) */
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