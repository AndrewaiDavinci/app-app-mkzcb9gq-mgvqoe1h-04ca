import { useState } from 'react';
import { cn } from '../lib/utils';

function ImageGrid({ images, onImageClick }) {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [hoveredImage, setHoveredImage] = useState(null);

  const handleImageLoad = (imageId) => {
    setLoadedImages(prev => new Set([...prev, imageId]));
  };

  const handleImageClick = (image) => {
    onImageClick(image);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {images?.map((image) => (
        <div
          key={image.id}
          className={cn(
            "group relative bg-white rounded-xl shadow-md overflow-hidden",
            "cursor-pointer transform transition-all duration-300 ease-out",
            "hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02]",
            "border border-slate-200"
          )}
          onMouseEnter={() => setHoveredImage(image.id)}
          onMouseLeave={() => setHoveredImage(null)}
          onClick={() => handleImageClick(image)}
        >
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden">
            {/* Loading Placeholder */}
            {!loadedImages.has(image.id) && (
              <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            
            {/* Actual Image */}
            <img
              src={image.src}
              alt={image.title}
              className={cn(
                "w-full h-full object-cover transition-all duration-500",
                "group-hover:scale-110",
                loadedImages.has(image.id) ? 'opacity-100' : 'opacity-0'
              )}
              onLoad={() => handleImageLoad(image.id)}
              loading="lazy"
            />
            
            {/* Overlay */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent",
              "opacity-0 transition-opacity duration-300",
              hoveredImage === image.id && "opacity-100"
            )}>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-semibold text-lg mb-1 transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                  {image.title}
                </h3>
                <p className="text-sm opacity-90 transform translate-y-4 transition-transform duration-300 delay-75 group-hover:translate-y-0">
                  {image.artist} • {image.year}
                </p>
              </div>
            </div>

            {/* View Details Button */}
            <div className={cn(
              "absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5",
              "text-sm font-medium text-slate-700 shadow-md",
              "opacity-0 transform translate-y-2 transition-all duration-300",
              hoveredImage === image.id && "opacity-100 translate-y-0"
            )}>
              자세히 보기
            </div>
          </div>

          {/* Card Content */}
          <div className="p-4">
            <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
              {image.title}
            </h3>
            <p className="text-sm text-slate-600 mb-2 line-clamp-2">
              {image.description}
            </p>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{image.artist}</span>
              <span>{image.dimensions}</span>
            </div>
          </div>

          {/* Hover Border Effect */}
          <div className={cn(
            "absolute inset-0 border-2 border-blue-600 rounded-xl",
            "opacity-0 transition-opacity duration-300",
            hoveredImage === image.id && "opacity-100"
          )} />
        </div>
      )) ?? (
        <div className="col-span-full text-center py-12">
          <p className="text-slate-500">표시할 이미지가 없습니다.</p>
        </div>
      )}
    </div>
  );
}

export default ImageGrid;