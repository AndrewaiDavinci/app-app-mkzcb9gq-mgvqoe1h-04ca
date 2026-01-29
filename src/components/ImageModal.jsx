import { useEffect, useCallback } from 'react';
import { cn } from '../lib/utils';

function ImageModal({ image, onClose }) {
  // ESC 키로 모달 닫기
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; // 배경 스크롤 방지

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [handleKeyDown]);

  // 배경 클릭으로 모달 닫기
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!image) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
      onClick={handleBackdropClick}
    >
      <div className={cn(
        "relative bg-white rounded-2xl shadow-2xl max-w-4xl max-h-[90vh] w-full",
        "overflow-hidden animate-in zoom-in-95 duration-300"
      )}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className={cn(
            "absolute top-4 right-4 z-10 w-10 h-10 bg-black/20 hover:bg-black/40",
            "backdrop-blur-sm rounded-full flex items-center justify-center",
            "text-white hover:text-white transition-all duration-200",
            "hover:scale-110 active:scale-95"
          )}
          aria-label="모달 닫기"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="flex-1 relative bg-slate-100">
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-full max-h-[60vh] lg:max-h-[80vh] object-contain"
            />
            
            {/* Image Loading Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-slate-50 animate-pulse" 
                 style={{ display: 'none' }} />
          </div>

          {/* Details Section */}
          <div className="lg:w-80 p-6 lg:p-8 flex flex-col">
            <div className="flex-1">
              {/* Title */}
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-3">
                {image.title}
              </h2>

              {/* Artist & Year */}
              <div className="flex items-center gap-3 mb-4 text-blue-600">
                <span className="font-medium">{image.artist}</span>
                <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                <span>{image.year}</span>
              </div>

              {/* Description */}
              <p className="text-slate-600 leading-relaxed mb-6">
                {image.description}
              </p>

              {/* Technical Details */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">크기</span>
                  <span className="text-slate-900">{image.dimensions}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">작가</span>
                  <span className="text-slate-900">{image.artist}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">제작년도</span>
                  <span className="text-slate-900">{image.year}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => window.open(image.src, '_blank')}
                className={cn(
                  "w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg",
                  "font-medium transition-colors duration-200",
                  "flex items-center justify-center gap-2"
                )}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                원본 크기로 보기
              </button>
              
              <button
                onClick={onClose}
                className={cn(
                  "w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-4 rounded-lg",
                  "font-medium transition-colors duration-200"
                )}
              >
                갤러리로 돌아가기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageModal;