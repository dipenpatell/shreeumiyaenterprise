import { useState, useEffect } from 'react';

export default function PhotographyGallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleItems, setVisibleItems] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [galleryData, setGalleryData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [videos, setVideos] = useState([]);
  const [videoIndex, setVideoIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    fetch("/medias.json")
      .then((res) => res.json())
      .then((data) => {
        setGalleryData(data.images.portfolio);
        setCategories([{id: "all", label: "All"}, ...[...new Set(data.images.portfolio.map(item => item.category))].map(category => ({
            id: category,
            label: category
          }))]);

        setVideos(data.videos.youtube_gellary);
      })
      .catch((err) => console.error('Error loading gallery:', err));
  }, []);

  useEffect(() => {
    const filteredItems = activeFilter === 'all' 
      ? galleryData 
      : galleryData.filter(item => item.category === activeFilter);
    
    setVisibleItems(filteredItems);
  }, [activeFilter, galleryData]);

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
  };

  const getCategoryLabel = (category) => {
    const categoryObj = categories.find(cat => cat.id === category);
    return categoryObj ? categoryObj.label : category;
  };

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedImage(visibleItems[index]);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : visibleItems.length - 1;
    setCurrentIndex(newIndex);
    setSelectedImage(visibleItems[newIndex]);
  };

  const goToNext = () => {
    const newIndex = currentIndex < visibleItems.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setSelectedImage(visibleItems[newIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const nextVideo = () => {
    setVideoIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    
    if (distance > minSwipeDistance && videoIndex < videos.length - 1) {
      nextVideo();
    }
    
    if (distance < -minSwipeDistance && videoIndex > 0) {
      prevVideo();
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-serif">
      {/* Header */}
      <header className="text-center py-16 px-8">
        <h1 className="text-4xl md:text-6xl font-light tracking-wider mb-4 bg-gradient-to-r from-teal-800 via-teal-600 to-blue-500 bg-clip-text text-transparent">
          GALLERY
        </h1>
        <p className="text-xl text-gray-600 font-light mb-12">
          Capturing Life's Most Precious Moments
        </p>
      </header>

      {/* Video Carousel Section */}
      <div className="max-w-7xl mx-auto px-8 mb-20">
        <h2 className="text-3xl md:text-4xl font-light text-center mb-12 text-teal-800">
          VIDEO GALLERY
        </h2>
        
        <div className="relative">
          {/* Navigation Arrows */}
          {videoIndex > 0 && (
            <button
              onClick={prevVideo}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-teal-800 text-white rounded-full p-3 hover:bg-teal-600 transition-all shadow-lg hover:scale-110"
              aria-label="Previous Videos"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {videoIndex < videos.length - 1 && (
            <button
              onClick={nextVideo}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-teal-800 text-white rounded-full p-3 hover:bg-teal-600 transition-all shadow-lg hover:scale-110"
              aria-label="Next Videos"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Video Slider */}
          <div 
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${videoIndex * (100 / 1)}%)` }}
            >
              {videos.map((video, index) => (
                <div key={index} className="mb-5 max-md:w-1/1 w-1/1 flex-shrink-0 px-3">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
                    <div className="relative aspect-video bg-black">
                      <iframe 
                        className="w-full h-full" 
                        src={video.link} 
                        title={video.title || "youtube video"} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" 
                        referrerpolicy="strict-origin-when-cross-origin" 
                        allowfullscreen
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-light text-gray-800 mb-1">{video.title}</h3>
                      <p className="text-xs text-teal-600 uppercase tracking-wider">{video.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(videos.length) }).map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all ${
                  index === videoIndex
                    ? 'bg-teal-800 w-8'
                    : 'bg-gray-300 w-8'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8">
        {/* Filter Tabs */}
        <div className="flex justify-center flex-wrap gap-4 mb-12 border-b border-gray-200 pb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleFilterClick(category.id)}
              className={`px-8 py-3 rounded-full border-2 border-teal-800 transition-all duration-300 text-sm tracking-wider uppercase font-serif ${
                activeFilter === category.id
                  ? 'bg-gradient-to-r from-teal-800 to-teal-600 text-white shadow-lg transform -translate-y-1'
                  : 'text-teal-800 hover:bg-gradient-to-r hover:from-teal-800 hover:to-teal-600 hover:text-white hover:transform hover:-translate-y-1 hover:shadow-lg'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {visibleItems.map((item, index) => (
            <div
              key={index}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl bg-gray-100"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeIn 0.6s ease-out forwards'
              }}
              onClick={() => openLightbox(index)}
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                  <p className="text-sm opacity-90 uppercase tracking-wider">
                    {getCategoryLabel(item.category)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {visibleItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">No photos found in this category.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-teal-400 transition-colors z-20 bg-black bg-opacity-50 rounded-full p-2"
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-teal-400 transition-colors z-20 bg-black bg-opacity-50 rounded-full p-3"
            aria-label="Previous"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-teal-400 transition-colors z-20 bg-black bg-opacity-50 rounded-full p-3"
            aria-label="Next"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Container */}
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={selectedImage.image}
              alt={selectedImage.alt}
                className="max-w-full max-h-full w-auto h-auto object-contain"
                style={{ maxHeight: 'calc(100vh - 120px)' }}
            />
            </div>
            <div className="text-center mt-4 text-white absolute bottom-6 left-0 right-0 z-10">
              <h3 className="text-xl font-light mb-1">{selectedImage.title}</h3>
              <p className="text-xs text-teal-400 uppercase tracking-wider">
                {getCategoryLabel(selectedImage.category)} • {currentIndex + 1} / {visibleItems.length}
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}