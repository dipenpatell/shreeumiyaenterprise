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

  const galleryData = [
    {
      id: 1,
      category: 'wedding',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=500&fit=crop',
      title: "Sarah & Michael's Wedding",
      alt: 'Wedding Photography'
    },
    {
      id: 2,
      category: 'wedding',
      image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=500&fit=crop',
      title: "Emma & David's Ceremony",
      alt: 'Wedding Photography'
    },
    {
      id: 3,
      category: 'pre-wedding',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=500&fit=crop',
      title: 'Romantic Sunset Session',
      alt: 'Pre-Wedding Photography'
    },
    {
      id: 4,
      category: 'pre-wedding',
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=500&fit=crop',
      title: 'Garden Love Story',
      alt: 'Pre-Wedding Photography'
    },
    {
      id: 5,
      category: 'engagement',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=500&fit=crop',
      title: 'The Proposal Moment',
      alt: 'Engagement Photography'
    },
    {
      id: 6,
      category: 'engagement',
      image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=400&h=500&fit=crop',
      title: 'Urban Engagement',
      alt: 'Engagement Photography'
    },
    {
      id: 7,
      category: 'portrait',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
      title: 'Classic Portrait',
      alt: 'Portrait Photography'
    },
    {
      id: 8,
      category: 'wedding',
      image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=400&h=500&fit=crop',
      title: 'Beach Wedding Bliss',
      alt: 'Wedding Photography'
    },
    {
      id: 9,
      category: 'event',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=500&fit=crop',
      title: 'Corporate Gala',
      alt: 'Event Photography'
    },
    {
      id: 10,
      category: 'event',
      image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=500&fit=crop',
      title: 'Birthday Celebration',
      alt: 'Event Photography'
    },
    {
      id: 11,
      category: 'wedding',
      image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=400&h=500&fit=crop',
      title: 'Beach Wedding Bliss',
      alt: 'Wedding Photography'
    },
    {
      id: 12,
      category: 'pre-wedding',
      image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&h=500&fit=crop',
      title: 'Mountain Adventure',
      alt: 'Pre-Wedding Photography'
    }
  ];

  useEffect(() => {
    const filteredItems = activeFilter === 'all' 
      ? galleryData 
      : galleryData.filter(item => item.category === activeFilter);
    
    setVisibleItems(filteredItems);
  }, [activeFilter]);

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
              key={item.id}
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