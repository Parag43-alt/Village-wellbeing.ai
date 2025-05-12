
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-health-primary rounded-full p-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-white"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </div>
            <span className="text-xl font-semibold text-health-primary">Rural Health</span>
          </Link>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-health-primary transition-colors">Home</Link>
            <Link to="/assistant" className="text-gray-700 hover:text-health-primary transition-colors">Health Assistant</Link>
            <Link to="/appointments" className="text-gray-700 hover:text-health-primary transition-colors">Appointments</Link>
            <Link to="/records" className="text-gray-700 hover:text-health-primary transition-colors">Medical Records</Link>
            <Link to="/campaigns" className="text-gray-700 hover:text-health-primary transition-colors">Health Campaigns</Link>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="fixed inset-0 z-50 bg-white md:hidden pt-16 px-4">
              <div className="flex flex-col space-y-6 text-center text-lg">
                <Link 
                  to="/" 
                  className="py-2 hover:text-health-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/assistant" 
                  className="py-2 hover:text-health-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Health Assistant
                </Link>
                <Link 
                  to="/appointments" 
                  className="py-2 hover:text-health-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Appointments
                </Link>
                <Link 
                  to="/records" 
                  className="py-2 hover:text-health-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Medical Records
                </Link>
                <Link 
                  to="/campaigns" 
                  className="py-2 hover:text-health-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Health Campaigns
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
