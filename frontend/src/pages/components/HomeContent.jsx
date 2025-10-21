import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomeContent() {
  const navigate = useNavigate();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const testimonials = [
    {
      name: "Priya & Arjun",
      text: "Our wedding photos perfectly captured every emotion and tradition. The way they documented our Saat Phere was absolutely magical.",
      ceremony: "Delhi Wedding",
    },
    {
      name: "Kavya & Rohan",
      text: "From Mehendi to Reception, every moment was beautifully preserved. They understood the cultural significance of each ritual.",
      ceremony: "Mumbai Wedding",
    },
    {
      name: "Ananya & Vikram",
      text: "Professional, respectful, and incredibly talented. Our families still can't stop praising the beautiful photographs.",
      ceremony: "Rajasthan Wedding",
    },
  ];

  const services = [
    {
      title: "Pre-Wedding",
      description: "Engagement shoots and couple portraits",
      features: ["Traditional outfits", "Cultural backdrops", "Candid moments"],
    },
    {
      title: "Wedding Day",
      description: "Complete coverage of all ceremonies",
      features: [
        "Full day coverage",
        "Multiple photographers",
        "Traditional & candid",
      ],
    },
    {
      title: "Reception",
      description: "Grand celebration documentation",
      features: ["Party highlights", "Family portraits", "Special moments"],
    },
  ];

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
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
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNextTestimonial();
    }
    if (isRightSwipe) {
      handlePrevTestimonial();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div className="bg-white">
      {/* About Section with Stats Cards */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6 bg-gradient-to-r from-[var(--primary-color)] to-teal-600 bg-clip-text text-transparent">
              About Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Passionate storytellers dedicated to preserving the sacred beauty
              of Hindu wedding traditions
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                20+
              </div>
              <div className="text-sm md:text-base text-orange-800 font-medium">
                Years Experience
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-2xl text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">
                500+
              </div>
              <div className="text-sm md:text-base text-pink-800 font-medium">
                Weddings Captured
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-2xl text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">
                15+
              </div>
              <div className="text-sm md:text-base text-[var(--primary-color)] font-medium">
                Cities Covered
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                1000+
              </div>
              <div className="text-sm md:text-base text-purple-800 font-medium">
                Happy Families
              </div>
            </div>
          </div>

          {/* Services Section */}
          <section className="py-20 px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-light mb-6 bg-gradient-to-r from-[var(--primary-color)] to-teal-600 bg-clip-text text-transparent">
                  Our Services
                </h2>
                <p className="text-xl text-gray-600">
                  Comprehensive photography packages for every part of your
                  wedding journey
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {service.description}
                      </p>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center justify-center text-sm text-gray-700"
                          >
                            <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-r from-teal-50 to-orange-50">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-16 bg-gradient-to-r from-[var(--primary-color)] to-orange-600 bg-clip-text text-transparent">
            What Couples Say
          </h2>

          <div className="relative">
            <div
              className="bg-white p-8 md:p-12 rounded-2xl shadow-xl transition-all duration-300"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="text-6xl text-teal-200 mb-4">"</div>
              <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
                {testimonials[activeTestimonial].text}
              </p>
              <div className="border-t pt-6">
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  {testimonials[activeTestimonial].name}
                </h4>
                <p className="text-teal-600 font-medium">
                  {testimonials[activeTestimonial].ceremony}
                </p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrevTestimonial}
              className="max-md:hidden absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 text-teal-600 hover:bg-teal-50"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={handleNextTestimonial}
              className="max-md:hidden absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 text-teal-600 hover:bg-teal-50"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeTestimonial === index
                      ? "bg-teal-600 scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20  text-white">
        <div className="max-w-4xl mx-auto text-center px-8">
          <h2 className="text-4xl md:text-5xl font-light mb-8 text-black">
            Ready to Preserve Your Sacred Journey?
          </h2>
          <p className="text-xl mb-12 leading-relaxed opacity-90 text-gray-600">
            Let us capture the beauty, traditions, and emotions of your Hindu
            wedding with the reverence and artistry it deserves.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/portfolio")}
              className="bg-[var(--primary-color)] text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              View Portfolio
            </button>
            <button
              onClick={() => navigate("/contact-us")}
              className="border-2 border-[var(--primary-color)] text-[var(--primary-color)] px-8 py-4 rounded-full text-lg font-medium hover:bg-[var(--primary-color)] hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
