import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden relative">
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-950 p-12 md:p-24 rounded-[4rem] shadow-2xl border border-gray-100 dark:border-gray-800 relative overflow-hidden group">
          {/* Decorative background effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 dark:bg-orange-950/20 rounded-full blur-3xl -z-10 group-hover:bg-orange-200 transition-colors duration-500"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 dark:bg-blue-950/20 rounded-full blur-3xl -z-10 group-hover:bg-blue-100 transition-colors duration-500"></div>

          <div className="space-y-10">
            <h2 className="text-4xl md:text-6xl font-bold text-[#1B2E4B] dark:text-white leading-[1.1]">
              Your next adventure starts with the right companion.
            </h2>
            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Join a global community of high-soul travelers and discover the world like never before.
            </p>

            <div className="flex justify-center pt-6">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-12 py-8 text-xl font-bold shadow-xl shadow-orange-500/30 hover:scale-105 transition-all duration-300"
                >
                  Join for Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;