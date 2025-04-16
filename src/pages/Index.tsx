
import React from 'react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Navbar from '@/components/Navbar';
import ContactForm from '@/components/ContactForm';
import AIChat from '@/components/AIChat';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';
import AdminButton from '@/components/AdminButton';

const Index = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <AIChat />
      <Pricing />
      <ContactForm />
      <Footer />
      <AdminButton />
    </>
  );
};

export default Index;
