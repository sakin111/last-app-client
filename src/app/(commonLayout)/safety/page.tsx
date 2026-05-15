import React from 'react';
import { ShieldCheck, UserCheck, Lock, EyeOff, AlertTriangle, CheckCircle, MessageSquare, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SafetyPage = () => {
  const safetyFeatures = [
    {
      icon: UserCheck,
      title: "Verified Profiles",
      description: "We manually review and verify every profile using government-issued IDs to ensure everyone is who they say they are.",
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-900/10"
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "Your contact information and precise location are never shared until you explicitly choose to share them with a match.",
      color: "text-indigo-500",
      bg: "bg-indigo-50 dark:bg-indigo-900/10"
    },
    {
      icon: ShieldCheck,
      title: "Insurance Support",
      description: "We partner with leading travel insurance providers to offer exclusive protection packages for our premium community.",
      color: "text-teal-500",
      bg: "bg-teal-50 dark:bg-teal-900/10"
    },
    {
      icon: MessageSquare,
      title: "Secure Messaging",
      description: "Communicate through our encrypted in-app chat system so you don't have to give out your personal number early on.",
      color: "text-orange-500",
      bg: "bg-orange-50 dark:bg-orange-900/10"
    }
  ];

  const travelTips = [
    "Always meet for the first time in a public, well-lit place.",
    "Share your travel itinerary with family or close friends.",
    "Trust your intuition — if something feels off, it probably is.",
    "Check reviews and ratings from previous travel partners.",
    "Keep your original documents in a safe place and carry copies.",
    "Avoid sharing your financial information or lending money."
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 px-6 py-2 rounded-full shadow-sm border border-gray-100 dark:border-gray-800 mb-8">
            <ShieldCheck className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-bold text-[#1B2E4B] dark:text-white uppercase tracking-widest">Your Safety is Our Priority</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-[#1B2E4B] dark:text-white mb-8 tracking-tighter">
            Travel with <span className="text-orange-500">Confidence</span>
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We've built a multi-layered security system to ensure your journey is safe, secure, and worry-free.
          </p>
        </div>
      </section>

      {/* Safety Features Grid */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {safetyFeatures.map((feature, i) => (
            <div key={i} className="flex gap-8 p-10 bg-gray-50 dark:bg-gray-900/50 rounded-[2.5rem] border border-transparent hover:border-orange-200 dark:hover:border-orange-900/30 transition-all duration-300">
              <div className={`${feature.bg} w-20 h-20 rounded-3xl flex items-center justify-center shrink-0`}>
                <feature.icon className={`w-10 h-10 ${feature.color}`} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#1B2E4B] dark:text-white mb-4">{feature.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tips Section */}
      <section className="bg-[#1B2E4B] py-24 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">Pro Tips for a Safe Journey</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Beyond our platform protections, we encourage our community to follow these essential travel safety practices.
              </p>
              <div className="space-y-4">
                {travelTips.map((tip, i) => (
                  <div key={i} className="flex gap-4 items-center group">
                    <CheckCircle className="w-6 h-6 text-orange-500 shrink-0" />
                    <span className="text-gray-300 text-lg group-hover:text-white transition-colors">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/5 backdrop-blur-md rounded-[3rem] p-12 border border-white/10 shadow-2xl">
                <AlertTriangle className="w-16 h-16 text-orange-500 mb-8" />
                <h3 className="text-3xl font-bold mb-6">Report Suspicious Behavior</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-10">
                  Our team is available 24/7 to investigate any reports. If you encounter any user violating our community guidelines or acting suspiciously, report them immediately.
                </p>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-10 py-6 text-lg font-bold transition-all shadow-xl shadow-orange-500/20">
                  Report a Concern
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1B2E4B] dark:text-white">Still have questions?</h2>
          <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed">
            Our safety team is here to help you feel comfortable and prepared for your next trip.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-[#1B2E4B] hover:bg-[#15253d] text-white rounded-full px-12 py-8 text-xl font-bold shadow-xl">
              <MessageSquare className="mr-2 h-6 w-6" /> Live Chat
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-12 py-8 text-xl font-bold border-2 border-[#1B2E4B] text-[#1B2E4B] dark:border-white dark:text-white">
              <PhoneCall className="mr-2 h-6 w-6" /> Emergency Help
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SafetyPage;
