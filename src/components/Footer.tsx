
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-16 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Rural Health</h3>
            <p className="text-gray-600 mb-4">
              Making healthcare accessible and affordable for rural communities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-health-primary hover:text-health-dark">
                <span className="sr-only">Facebook</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-health-primary hover:text-health-dark">
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="text-health-primary hover:text-health-dark">
                <span className="sr-only">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-health-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/assistant" className="text-gray-600 hover:text-health-primary transition-colors">
                  Health Assistant
                </Link>
              </li>
              <li>
                <Link to="/appointments" className="text-gray-600 hover:text-health-primary transition-colors">
                  Book Appointments
                </Link>
              </li>
              <li>
                <Link to="/records" className="text-gray-600 hover:text-health-primary transition-colors">
                  Medical Records
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Health Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-health-primary transition-colors">
                  First Aid Information
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-health-primary transition-colors">
                  Common Illness Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-health-primary transition-colors">
                  Pregnancy Care
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-health-primary transition-colors">
                  Child Health
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Phone: +91-123-456-7890</li>
              <li>Email: support@ruralhealth.org</li>
              <li>Emergency: 108</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Rural Health. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
