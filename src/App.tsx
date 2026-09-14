import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { FeaturedProjectsSection } from './components/FeaturedProjectsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectInquiryModal } from './components/ProjectInquiryModal';
import { PortfolioDrawer } from './components/PortfolioDrawer';
import { LocationModal } from './components/LocationModal';

export default function App() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#07090d] text-stone-100 font-sans antialiased overflow-x-hidden relative">
      {/* Subtle top navigation bar */}
      <Navbar
        onOpenInquiry={() => setInquiryOpen(true)}
        onOpenPortfolio={() => setPortfolioOpen(true)}
        onOpenLocation={() => setLocationOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Full-Screen Hero Section */}
        <HeroSection
          onOpenInquiry={() => setInquiryOpen(true)}
          onOpenPortfolio={() => setPortfolioOpen(true)}
        />

        {/* Second Section: Premium Services & Process Section */}
        <ServicesSection
          onOpenInquiry={() => setInquiryOpen(true)}
          onOpenPortfolio={() => setPortfolioOpen(true)}
        />

        {/* Third Section: About The Company */}
        <AboutSection
          onOpenInquiry={() => setInquiryOpen(true)}
          onOpenPortfolio={() => setPortfolioOpen(true)}
        />

        {/* Fourth Section: Featured Projects Showcase */}
        <FeaturedProjectsSection
          onOpenPortfolio={() => setPortfolioOpen(true)}
          onOpenInquiry={(projectTitle) => {
            setInquiryOpen(true);
          }}
        />

        {/* Fifth Section: Premium Testimonials & Client Reviews */}
        <TestimonialsSection
          onOpenInquiry={() => setInquiryOpen(true)}
          onOpenPortfolio={() => setPortfolioOpen(true)}
        />

        {/* Sixth Section: Premium Contact Us & Consultation Section */}
        <ContactSection
          onOpenPortfolio={() => setPortfolioOpen(true)}
          onOpenLocation={() => setLocationOpen(true)}
        />
      </main>

      {/* Polish Architectural Footer */}
      <Footer
        onOpenInquiry={() => setInquiryOpen(true)}
        onOpenPortfolio={() => setPortfolioOpen(true)}
        onOpenLocation={() => setLocationOpen(true)}
      />

      {/* Interactive Project Consultation Modal */}
      <ProjectInquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
      />

      {/* Interactive Works & Portfolio Drawer */}
      <PortfolioDrawer
        isOpen={portfolioOpen}
        onClose={() => setPortfolioOpen(false)}
        onSelectProjectForInquiry={() => {
          setPortfolioOpen(false);
          setInquiryOpen(true);
        }}
      />

      {/* Location & Directions Modal */}
      <LocationModal
        isOpen={locationOpen}
        onClose={() => setLocationOpen(false)}
      />
    </div>
  );
}
