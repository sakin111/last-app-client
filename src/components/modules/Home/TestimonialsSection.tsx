import { Card, CardContent } from '@/components/ui/card';
import { Quote, ShieldCheck, CheckCircle2, UserCircle2 } from 'lucide-react';
import Image from 'next/image';

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-[#1B2E4B] dark:bg-gray-950 text-white overflow-hidden relative">
      {/* Decorative background shape */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Stats/Benefits List */}
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-orange-400 font-bold tracking-widest uppercase text-sm">COMMUNITY FIRST</span>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">Your Safety is Our Top Priority</h2>
            </div>

            <div className="space-y-8">
              {[
                {
                  icon: ShieldCheck,
                  title: "Encrypted Communication",
                  desc: "Your details are only shared when you both agree to a match."
                },
                {
                  icon: CheckCircle2,
                  title: "Document ID Verification",
                  desc: "We verify all premium members with official documentation."
                },
                {
                  icon: UserCircle2,
                  title: "Community Reviews",
                  desc: "Transparent history and ratings from previous travel partners."
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-orange-500/20 transition-colors">
                    <item.icon className="w-7 h-7 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Testimonial Card */}
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-md rounded-[3rem] p-12 border border-white/10 shadow-2xl relative">
              <Quote className="w-16 h-16 text-orange-500 opacity-50 mb-8" />
              
              <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-10 italic">
                "Finding the right person to travel with changed everything for me. I was hesitant at first, but now I've found a life-long friend and travel partner. Truly a game changer."
              </blockquote>

              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-orange-500">
                  <Image 
                    src="https://res.cloudinary.com/dmbf41o2r/image/upload/v1762332917/file-1762332910196-56934235.jpg" 
                    alt="Sarah Jenkins" 
                    width={64} 
                    height={64} 
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-xl font-bold">Sarah Jenkins</p>
                  <p className="text-orange-400 text-sm font-semibold uppercase tracking-wider">Adventurer since 2023</p>
                </div>
              </div>
            </div>

            {/* Floating decoration */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-500 rounded-[2rem] -z-10 rotate-12"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;