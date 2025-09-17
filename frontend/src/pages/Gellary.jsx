import { useState, useEffect } from 'react';

export default function PhotographyGallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleItems, setVisibleItems] = useState([]);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'wedding', label: 'Wedding' },
    { id: 'pre-wedding', label: 'Pre-Wedding' },
    { id: 'engagement', label: 'Engagement' },
    { id: 'portrait', label: 'Portrait' },
    { id: 'event', label: 'Events' }
  ];

  const [galleryData, setGalleryData] = useState([]);

  useEffect(() => {
    fetch("/medias.json") // ✅ loads from public folder
      .then((res) => res.json())
      .then((data) => setGalleryData(data.images.portfolio));
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {visibleItems.map((item, index) => (
            <div
              key={index}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl bg-gray-100"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeIn 0.6s ease-out forwards'
              }}
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