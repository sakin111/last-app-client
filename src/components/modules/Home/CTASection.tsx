import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-24 bg-liner-to-br from-blue-600 via-indigo-700 to-purple-800 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-black">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl md:text-2xl mb-10 text-gray-600 leading-relaxed">
            Join thousands of travelers and find your perfect travel companion today
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button 
                size="lg" 
                variant="outline"
                className='text-xl text-blue-950'
              >
                <Heart className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Join TravelBuddy Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          <div className="mt-10 flex items-center justify-center gap-8 text-sm text-blue-100">
            <div className="flex items-center gap-2  text-teal-700">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className='text-cyan-800'>No credit card required</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-teal-700">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className='text-cyan-800'>Free to join</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;