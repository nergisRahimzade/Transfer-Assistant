import { GraduationCap, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-6 h-6 text-blue-400" />
              <span className="text-xl text-white">TransferAI</span>
            </div>
            <p className="text-sm text-gray-400">
              Empowering California Community College students to achieve their transfer goals with AI-powered guidance.
            </p>
          </div>

          <div>
            <h4 className="text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#assistant" className="hover:text-blue-400 transition-colors">AI Assistant</a></li>
              <li><a href="#resources" className="hover:text-blue-400 transition-colors">Resources</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">ASSIST.org</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">UC Application</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">CSU Application</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">IGETC Guide</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>support@transferai.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>California, USA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; 2026 TransferAI. All rights reserved. Built to support California Community College students.</p>
        </div>
      </div>
    </footer>
  );
}
