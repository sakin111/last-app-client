import Image from 'next/image';
import { Apple, Play } from 'lucide-react';

const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20 items-center max-w-6xl mx-auto">
          {/* Phone Mockup Image */}
          <div className="relative flex justify-center">
            <div className="relative w-[320px] h-[640px] md:w-[380px] md:h-[760px]">
              <Image 
                src="/images/home/app-mockup.png" 
                alt="App Mockup" 
                fill 
                className="object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]"
                priority
              />
            </div>
            {/* Background blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-100 dark:bg-orange-950/20 rounded-full -z-10 blur-3xl"></div>
          </div>

          {/* Content */}
          <div className="space-y-10">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-bold text-[#1B2E4B] dark:text-white leading-tight">
                Adventure in your pocket
              </h2>
              <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg">
                Swipe through trusted profiles, chat with vetted travelers, and plan adventures together. The world is just a few taps away with our mobile app.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              {/* App Store Button */}
              <button className="flex items-center gap-4 bg-[#1B2E4B] text-white px-8 py-4 rounded-[1.5rem] hover:scale-105 transition-all shadow-xl shadow-blue-900/20 w-full sm:w-auto">
                <div className="bg-white/10 p-2 rounded-xl">
                  <Apple className="w-8 h-8 fill-white" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold opacity-60 uppercase tracking-widest">Download on the</p>
                  <p className="text-xl font-bold leading-none">App Store</p>
                </div>
              </button>

              {/* Play Store Button */}
              <button className="flex items-center gap-4 bg-[#1B2E4B] text-white px-8 py-4 rounded-[1.5rem] hover:scale-105 transition-all shadow-xl shadow-blue-900/20 w-full sm:w-auto">
                <div className="bg-white/10 p-2 rounded-xl">
                  <Play className="w-8 h-8 fill-white" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold opacity-60 uppercase tracking-widest">Get it on</p>
                  <p className="text-xl font-bold leading-none">Google Play</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
