
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative text-foreground py-24 md:py-36 overflow-hidden bg-background">
      <div className="absolute inset-0  opacity-10"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob "></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 "></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-cyan-800 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4 text-cyan-800" />
            <span className="text-sm font-medium text-accent-foreground">Join 50,000+ Happy Travelers</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-transparent mb-6 bg-clip-text bg-gradient-to-r from-black to-cyan-600 animate-fade-in-up dark:from-white dark:to-cyan-400 animation-delay-100">
            Find Your Perfect Travel Companion
          </h1>

          <p className="text-xl md:text-2xl mb-10 text-chart-3 leading-relaxed animate-fade-in-up animation-delay-200">
            Connect with verified travelers worldwide, share adventures, and create unforgettable memories together
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
            <Link href="/travel">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 w-full sm:w-auto group">
                <Search className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Explore Travelers
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="lg"
                variant="outline"
                className=" border-2 border-white/30 bg-accent-foreground backdrop-blur-sm text-white hover:bg-white hover:text-blue-600 hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                Get Started Free
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm animate-fade-in animation-delay-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className='text-muted-foreground'>100% Verified Profiles</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className='text-muted-foreground'>Secure & Private</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default HeroSection;
