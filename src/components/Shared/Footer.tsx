import Image from 'next/image';
import Link from 'next/link';
import { Globe, Instagram, Twitter } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-20 border-b border-gray-100 dark:border-gray-800 pb-20">
          <div className="max-w-sm space-y-8">
            <Link href="/" className="inline-block">
              <h2 className="text-3xl font-black text-[#1B2E4B] dark:text-white tracking-tighter">
                Travel Buddy Matcher
              </h2>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg">
              Empowering travelers to find their perfect soulmate for the journey ahead. Built for security, speed, and genuine connection.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-24">
            <div className="space-y-6">
              <h3 className="font-bold text-[#1B2E4B] dark:text-white text-lg">Company</h3>
              <ul className="space-y-4 text-gray-500 dark:text-gray-400">
                <li><Link href="/about" className="hover:text-orange-500 transition-colors">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-orange-500 transition-colors">Careers</Link></li>
                <li><Link href="/blog" className="hover:text-orange-500 transition-colors">Journal</Link></li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h3 className="font-bold text-[#1B2E4B] dark:text-white text-lg">Destinations</h3>
              <ul className="space-y-4 text-gray-500 dark:text-gray-400">
                <li><Link href="/travel?region=bali" className="hover:text-orange-500 transition-colors">Bali</Link></li>
                <li><Link href="/travel?region=japan" className="hover:text-orange-500 transition-colors">Japan</Link></li>
                <li><Link href="/travel?region=iceland" className="hover:text-orange-500 transition-colors">Iceland</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="font-bold text-[#1B2E4B] dark:text-white text-lg">Support</h3>
              <ul className="space-y-4 text-gray-500 dark:text-gray-400">
                <li><Link href="/help-center" className="hover:text-orange-500 transition-colors">Help Center</Link></li>
                <li><Link href="/safety" className="hover:text-orange-500 transition-colors">Safety Guidelines</Link></li>
                <li><Link href="/contact" className="hover:text-orange-500 transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="font-bold text-[#1B2E4B] dark:text-white text-lg">Legal</h3>
              <ul className="space-y-4 text-gray-500 dark:text-gray-400">
                <li><Link href="/terms" className="hover:text-orange-500 transition-colors">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-orange-500 transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-gray-400 text-sm font-medium">
          <p>© {new Date().getFullYear()} Travel Buddy Matcher. Premium Member of Global Travel Association.</p>
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer hover:text-orange-500 transition-colors">
              <Globe className="w-4 h-4" />
              <span>English (US)</span>
            </div>
            <div className="flex items-center gap-6">
              <Instagram className="w-5 h-5 cursor-pointer hover:text-orange-500 transition-colors" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-orange-500 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;