import React from 'react';
import { Mail, Phone, MapPin, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[var(--primary-color)] py-16 px-6 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="max-h-[200px] min-h-20 flex items-center justify-center">
            <img className='h-full' src="/white_SUE_logo.png" alt="" srcset="" />
          </div>
        </div>

        {/* Main text */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-light mb-6">
            Your story deserves to be captured beautifully
          </h2>

          {/* Email */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <Mail className="w-5 h-5 text-white" />
            <a 
              href="mailto:shreeumiyaenterprise16@gmail.com"
              className="text-xl md:text-2xl font-medium hover:text-white transition-colors"
            >
              shreeumiyaenterprise16@gmail.com
            </a>
          </div>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {/* Phone Number */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Phone className="w-4 h-4 text-white" />
              <span className="text-sm text-white font-medium">Phone Number</span>
            </div>
            <div>
              <a href="tel:+919824832113">
                +91 9824832113
              </a>
            </div>
          </div>

          {/* Address */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-white" />
              <span className="text-sm text-white font-medium">Address</span>
            </div>
            <p className="text-white font-medium">Gujarat, India</p>
          </div>

          {/* Social Media */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Instagram className="w-4 h-4 text-white" />
              <span className="text-sm text-white font-medium">Instagram</span>
            </div>
            <a 
              href="https://instagram.com/shreeumiyaenterprise/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white font-medium hover:text-white transition-colors"
            >
              Follow Us
            </a>
          </div>

          {/* Youtube */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Youtube className="w-4 h-4 text-white" />
              <span className="text-sm text-white font-medium">YouTube</span>
            </div>
            <a 
              href="https://youtube.com/shreeumiyaenterprise/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white font-medium hover:text-white transition-colors"
            >
              Subscribe Now
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-gray-200 pt-8">
          <p className="text-white text-sm">
            ©1999 Shree Umiya Enterprise. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;