
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HealthAssistant from '@/components/HealthAssistant';
import { doctors, healthCampaigns } from '@/data/healthData';
import { Calendar, MapPin, Heart, MessageSquare, User, Video } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const Index = () => {
  // Featured campaigns (just the first 2)
  const featuredCampaigns = healthCampaigns.slice(0, 2);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-health-light py-16 md:py-24">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-6 md:gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-health-primary">
                Affordable Healthcare for Rural Areas
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Access quality healthcare services through our virtual health assistant
                and connect with local doctors, all from the comfort of your home.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button className="btn-health-primary px-6 py-3 text-base" asChild>
                  <Link to="/assistant">Talk to Health Assistant</Link>
                </Button>
                <Button className="btn-health-secondary px-6 py-3 text-base" asChild variant="outline">
                  <Link to="/appointments">Book Appointment</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative z-10">
              <div className="bg-white p-4 rounded-lg shadow-lg max-w-md mx-auto">
                <HealthAssistant />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="health-card text-center">
                <div className="w-16 h-16 bg-health-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="text-health-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Virtual Health Assistant</h3>
                <p className="text-gray-600">
                  Get answers to basic health queries and receive guidance on common health issues without visiting a doctor.
                </p>
              </div>
              
              <div className="health-card text-center">
                <div className="w-16 h-16 bg-health-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="text-health-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Remote Consultations</h3>
                <p className="text-gray-600">
                  Book virtual appointments with healthcare providers and get medical advice from the comfort of your home.
                </p>
              </div>
              
              <div className="health-card text-center">
                <div className="w-16 h-16 bg-health-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="text-health-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Medical Records</h3>
                <p className="text-gray-600">
                  Safely store your medical history, prescriptions, and treatment plans for easy access during consultations.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Doctors Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Meet Our Doctors</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Our platform connects you with qualified healthcare professionals who are dedicated to providing quality care to rural communities.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="health-card">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold text-center mb-1">{doctor.name}</h3>
                  <p className="text-health-primary text-center mb-4">{doctor.specialty}</p>
                  <div className="text-gray-600 text-sm space-y-2">
                    <div><span className="font-medium">Experience:</span> {doctor.experience} years</div>
                    <div><span className="font-medium">Languages:</span> {doctor.languages.join(', ')}</div>
                    <div className="text-xs text-gray-500 mt-3">Available: {doctor.availability.join(', ')}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Button className="btn-health-secondary" asChild>
                <Link to="/appointments">Book an Appointment</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Campaigns Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Health Campaigns</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Stay updated about health awareness programs and vaccination drives in your area
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredCampaigns.map((campaign) => (
                <div key={campaign.id} className="health-card flex flex-col">
                  <div className="h-40 bg-gray-200"></div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold mb-2">{campaign.title}</h3>
                    <p className="text-gray-600 mb-4 flex-1">{campaign.description}</p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {format(parseISO(campaign.date), 'MMM d, yyyy')}
                      </div>
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {campaign.location.split(',')[0]}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Button className="btn-health-secondary" asChild>
                <Link to="/campaigns">View All Campaigns</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-health-light">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What People Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold">Rajesh Sharma</h4>
                    <p className="text-sm text-gray-500">Farmer, Alwar</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "The virtual doctor helped me identify my condition when I couldn't travel to the city. 
                  I got medicine recommendations and follow-up with a real doctor when needed."
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold">Sunita Devi</h4>
                    <p className="text-sm text-gray-500">Homemaker, Bharatpur</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "The vaccination campaign information helped me ensure my children got all their shots on time. 
                  The health assistant also provided valuable advice about childcare."
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold">Mohan Singh</h4>
                    <p className="text-sm text-gray-500">Teacher, Jodhpur</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "I used the video consultation feature to talk to a specialist in the city without traveling. 
                  It saved me time and money, and I got the care I needed."
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-health-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <Heart className="mx-auto h-16 w-16 mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your Health Journey Today</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Access affordable healthcare services, speak with our virtual assistant, 
              and connect with healthcare professionals from anywhere.
            </p>
            <Button className="bg-white text-health-primary hover:bg-gray-100 px-8 py-3 text-lg" asChild>
              <Link to="/assistant">Get Started</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
