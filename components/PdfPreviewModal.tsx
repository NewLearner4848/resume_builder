import React, { useEffect, useRef, useState } from 'react';

interface PdfPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  htmlContent: string;
  title: string;
}

const XMarkIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const PrinterIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
    </svg>
);


export const PdfPreviewModal: React.FC<PdfPreviewModalProps> = ({ isOpen, onClose, htmlContent, title }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isReadyToPrint, setIsReadyToPrint] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsReadyToPrint(false);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [isOpen]);

  const handlePrint = () => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.print();
    }
  };

  const handleIframeLoad = () => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow || !iframe.contentDocument) {
      return;
    }
    
    // Clear any existing interval
    if (intervalRef.current) {
        clearInterval(intervalRef.current);
    }

    const checkReadiness = async () => {
      if (!iframe.contentDocument || !iframe.contentWindow) return false;

      try {
        await iframe.contentDocument.fonts.ready;
        const bodyStyle = iframe.contentWindow.getComputedStyle(iframe.contentDocument.body);
        const isTailwindReady = bodyStyle.fontFamily.includes('Inter');
        return isTailwindReady;
      } catch (e) {
        console.error("Error checking iframe readiness:", e);
        return false;
      }
    };

    intervalRef.current = window.setInterval(async () => {
      const ready = await checkReadiness();
      if (ready) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsReadyToPrint(true);
      }
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 printable-hidden" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[95vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <header className="p-4 border-b border-slate-200 flex-shrink-0 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">{title}</h2>
          <button onClick={onClose} className="p-1 rounded-full text-slate-500 hover:bg-slate-100">
             <XMarkIcon className="w-6 h-6" />
          </button>
        </header>
        
        <main className="flex-grow bg-slate-200 overflow-y-auto relative">
          {!isReadyToPrint && (
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-slate-200 z-10">
              <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-slate-600 font-medium">Preparing high-quality preview...</p>
            </div>
          )}
          <iframe
            ref={iframeRef}
            srcDoc={htmlContent}
            onLoad={handleIframeLoad}
            title={title}
            className={`w-full h-full border-0 transition-opacity duration-300 ${isReadyToPrint ? 'opacity-100' : 'opacity-0'}`}
          />
        </main>

        <footer className="p-4 bg-slate-100 border-t border-slate-200 flex-shrink-0 flex justify-end items-center space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-100"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            disabled={!isReadyToPrint}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-accent rounded-md hover:brightness-95 disabled:bg-accent/70 disabled:cursor-not-allowed transition-colors"
          >
            <PrinterIcon className="w-5 h-5" />
            <span>Print / Save as PDF</span>
          </button>
        </footer>
      </div>
    </div>
  );
};
