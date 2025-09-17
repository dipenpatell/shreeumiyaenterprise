import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Camera, Clock, Send } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: ''
  });

  const eventTypes = [
    {label: "Wedding Ceremony", value: "wedding_ceremony" },
    {label: "Engagement Ceremony", value: "engagement_ceremony" },
    {label: "Pre-wedding Shoot", value: "pre_wedding_shoot" },
    {label: "Portrait Session", value: "portrait_session" },
    {label: "Commercial Shoot", value: "Commercial_shoot" },
    {label: "Event Photography", value: "Event_photography" },
    {label: "Family Photography", value: "family_photography" },
    {label: "Other", value: "Other" }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
    alert('Thank you for your message! We\'ll get back to you soon.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-[200px] flex items-center justify-center mx-auto mb-8">
            <img className='h-full' src="/black_SUE_logo.png" alt="" srcset="" />
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
            Let's Create Something Beautiful
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to capture your special moments? We'd love to hear about your vision and bring it to life through stunning photography.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">Tell Us About Your Project</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="+91 87654 32123"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Type
                  </label>
                  <select
                    name="event"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  >
                    <option value="">Select a event</option>
                    {eventTypes.map((event) => (
                      <option key={event.value} value={event.value}>{event.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tell us about your project
                </label>
                <textarea
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
                  placeholder="Share your vision, ideas, and any specific requirements..."
                ></textarea>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-black text-white py-4 px-8 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            {/* Quick Contact */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Get In Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <Mail className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Email</h4>
                    <a href="mailto:shreeumiyaenterprise@gmail.COM" className="text-gray-600 hover:text-black transition-colors">
                      shreeumiyaenterprise@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <Phone className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Phone</h4>
                    <a href="tel:+919824832113" className="text-gray-600 hover:text-black transition-colors">
                      +91 9824832113
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <MapPin className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Location</h4>
                    <p className="text-gray-600">Gujarat, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <Instagram className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Social Media</h4>
                    <a href="https://instagram.com/shreeumiyaenterprise/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors">
                      Follow us on Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Overview */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Our Services</h3>
              
              <div className="grid grid-cols-2 gap-2">
                
                {eventTypes.map((event) => (
                  <div className="flex items-center gap-3">
                  <Camera className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{event.label}</span>
                </div>
                ))}
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-r from-gray-800 to-black rounded-2xl p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6" />
                <h3 className="text-xl font-semibold">Quick Response</h3>
              </div>
              <p className="text-gray-300 mb-4">
                We typically respond to inquiries within 24 hours. For urgent requests, please call us directly.
              </p>
              <div className="text-sm text-gray-400">
                Business Hours: Mon - Sat, 9:00 AM - 8:00 PM (IST)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-light text-gray-800 text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">How far in advance should I book?</h4>
              <p className="text-gray-600">We recommend booking 2-3 months in advance, especially for weddings and events during peak seasons.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Do you travel for shoots?</h4>
              <p className="text-gray-600">Yes, we're available for destination shoots. Travel costs will be discussed during consultation.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">What's included in packages?</h4>
              <p className="text-gray-600">Each package includes professional editing, high-resolution images, and an online gallery for easy sharing.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Can we see samples of your work?</h4>
              <p className="text-gray-600">Absolutely! We'll share a portfolio relevant to your specific type of shoot during our consultation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;