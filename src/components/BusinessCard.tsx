import React from 'react';

interface BusinessCardProps {
  lang?: string;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ lang = 'en' }) => {
  const isSpanish = lang === 'es';

  const content = {
    name: 'Christophe James Clark',
    title: isSpanish ? 'Candidato al Concejo Municipal' : 'City Council Candidate',
    phone: '(555) 123-4567',
    email: 'info@cjclarkeforcouncil.org',
    website: 'cjclarkeforcouncil.org',
    slogan: isSpanish ? 'Un Sheridan Más Saludable y Seguro' : 'A Healthier, Safer Sheridan',
    titleLabel: isSpanish ? 'Título de Campaña' : 'Business Card'
  };

  const handlePrint = () => {
    // Create a print-specific stylesheet
    const printStyle = document.createElement('style');
    printStyle.innerHTML = `
      @media print {
        body * { visibility: hidden; }
        #business-card-content, #business-card-content * { visibility: visible; }
        #business-card-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 3.5in;
          height: 2in;
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-cj-blue mb-4">{content.titleLabel}</h1>
        <button
          onClick={handlePrint}
          className="bg-cj-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-cj-red/90 transition-colors flex items-center gap-2 mx-auto"
        >
          🖨️ Print Business Card
        </button>
      </div>

      {/* Business Card */}
      <div id="business-card-content" className="business-card bg-white shadow-lg mx-auto border-2 border-cj-blue print:shadow-none print:border-none" style={{maxWidth: '3.5in'}}>
        <div className="p-4" style={{width: '3.5in', height: '2in'}}>
          {/* Header with Flag */}
          <div className="flex items-center mb-2">
            <div className="flag-stripes flex h-3 mr-2">
              <div className="bg-cj-red flex-1"></div>
              <div className="bg-cj-white flex-1 border-l border-r border-gray-300"></div>
              <div className="bg-cj-blue flex-1"></div>
            </div>
            <div className="text-xs font-bold text-cj-blue">CJ CLARK</div>
          </div>

          {/* Name and Title */}
          <div className="mb-2">
            <h3 className="text-sm font-bold text-cj-blue">{content.name}</h3>
            <p className="text-xs text-cj-gray-900">{content.title}</p>
          </div>

          {/* Contact Info */}
          <div className="text-xs text-cj-gray-900 space-y-1">
            <p>📞 {content.phone}</p>
            <p>📧 {content.email}</p>
            <p>🌐 {content.website}</p>
          </div>

          {/* Footer */}
          <div className="mt-2 pt-2 border-t border-cj-blue/30">
            <p className="text-xs font-bold text-cj-red text-center">{content.slogan}</p>
          </div>
        </div>
      </div>

      {/* Print Instructions */}
      <div className="mt-8 bg-cj-gray-50 p-6 rounded-lg text-center print:hidden">
        <h4 className="text-lg font-bold text-cj-blue mb-4">
          {isSpanish ? 'Instrucciones de Impresión:' : 'Printing Instructions:'}
        </h4>
        <div className="text-sm text-cj-gray-900 space-y-2">
          <p>{isSpanish ? '1. Haga clic en "Imprimir Tarjeta de Visita" arriba' : '1. Click "Print Business Card" above'}</p>
          <p>{isSpanish ? '2. Seleccione tamaño de papel: 3.5x2 pulgadas' : '2. Select paper size: 3.5x2 inches'}</p>
          <p>{isSpanish ? '3. Configure márgenes a 0.25 pulgadas' : '3. Set margins to 0.25 inches'}</p>
          <p>{isSpanish ? '4. Puede imprimir múltiples tarjetas por página' : '4. You can print multiple cards per page'}</p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            .business-card {
              box-shadow: none !important;
              margin: 0 !important;
              border: none !important;
              max-width: none !important;
            }

            body {
              margin: 0 !important;
              padding: 0 !important;
            }

            @page {
              size: 3.5in 2in;
              margin: 0.25in;
            }
          }

          @media (max-width: 768px) {
            .business-card {
              max-width: 100% !important;
              padding: 1rem !important;
            }
          }
        `
      }} />
    </div>
  );
};

export default BusinessCard;
