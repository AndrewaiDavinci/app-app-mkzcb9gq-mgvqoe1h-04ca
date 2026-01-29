import { useState } from 'react';
import ImageGrid from './components/ImageGrid';
import ImageModal from './components/ImageModal';

const galleryImages = [
  {
    id: 1,
    src: '/assets/asset.png',
    title: '추상적 풍경',
    description: '현대적이고 미니멀한 추상화 작품입니다.',
    artist: '김아티스트',
    year: '2024',
    dimensions: '2048 × 1536'
  },
  {
    id: 2,
    src: '/assets/asset_1.png',
    title: '기하학적 패턴',
    description: '정교한 기하학적 형태로 구성된 현대 미술 작품입니다.',
    artist: '박모던',
    year: '2024',
    dimensions: '2048 × 2048'
  },
  {
    id: 3,
    src: '/assets/asset_2.png',
    title: '컬러 하모니',
    description: '색채의 조화로움을 표현한 아름다운 작품입니다.',
    artist: '이컬러',
    year: '2024',
    dimensions: '2048 × 2048'
  },
  {
    id: 4,
    src: '/assets/asset_3.png',
    title: '디지털 아트',
    description: '현대 디지털 기술로 창작된 독창적인 작품입니다.',
    artist: '정디지털',
    year: '2024',
    dimensions: '1024 × 1024'
  },
  {
    id: 5,
    src: '/assets/asset_4.png',
    title: '파노라마 뷰',
    description: '넓은 시야각으로 표현된 풍경 작품입니다.',
    artist: '최와이드',
    year: '2024',
    dimensions: '1024 × 576'
  }
];

function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              아트 갤러리
            </h1>
            <p className="text-slate-600 text-lg">
              아름다운 작품들을 감상해보세요
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-slate-900">
              컬렉션 ({galleryImages.length}점)
            </h2>
            <div className="text-sm text-slate-500">
              이미지를 클릭하여 자세히 보기
            </div>
          </div>
          
          <ImageGrid 
            images={galleryImages} 
            onImageClick={openModal}
          />
        </div>

        {/* Footer */}
        <footer className="text-center py-8 text-slate-500">
          <p>© 2024 아트 갤러리. 모든 작품은 저작권의 보호를 받습니다.</p>
        </footer>
      </main>

      {/* Modal */}
      {selectedImage && (
        <ImageModal 
          image={selectedImage} 
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default App;