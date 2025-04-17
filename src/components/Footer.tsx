
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-finwise-blue text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Short Description */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold">
                <span className="text-finwise-green-light">Fin</span>Wise Hub
              </span>
            </Link>
            <p className="text-gray-300 text-sm">
              Empowering financial literacy through education, interactive tools,
              and personalized guidance.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-white hover:text-finwise-green-light transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-finwise-green-light transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-finwise-green-light transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-finwise-green-light transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-finwise-green-light text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/chatbot" className="text-gray-300 hover:text-finwise-green-light text-sm transition-colors">
                  Financial Assistant
                </Link>
              </li>
              <li>
                <Link to="/videos" className="text-gray-300 hover:text-finwise-green-light text-sm transition-colors">
                  Video Library
                </Link>
              </li>
              <li>
                <Link to="/games" className="text-gray-300 hover:text-finwise-green-light text-sm transition-colors">
                  Learning Games
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-300 hover:text-finwise-green-light text-sm transition-colors">
                  Subscription Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail size={16} />
                <span>support@finwisehub.com</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-finwise-green-light text-sm transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-finwise-green-light text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-finwise-green-light text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} FinWise Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
