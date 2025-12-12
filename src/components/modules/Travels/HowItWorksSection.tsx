

"use client";

import {
  IconMapPin,
  IconUsers,
  IconMessageCircle,
  IconCheck,
  IconArrowRight,
} from "@tabler/icons-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: IconMapPin,
      title: "Create Your Trip",
      description:
        "Share your travel destination, dates, budget, and what you're looking for in a travel buddy.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: IconUsers,
      title: "Find Buddies",
      description:
        "Browse other travelers with similar interests and travel plans. See their profiles and preferences.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: IconMessageCircle,
      title: "Connect & Chat",
      description:
        "Send requests and messages to potential travel buddies. Get to know them before your journey.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: IconCheck,
      title: "Confirm & Travel",
      description:
        "Once matched, finalize your plans and embark on an amazing adventure together!",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            How Travel Buddy Works
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Find your perfect travel companion in just 4 simple steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Card */}
                <div className="h-full bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-slate-100">
                  {/* Icon Container */}
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 transform transition-transform hover:scale-110`}
                  >
                    <Icon size={32} className="text-white" strokeWidth={1.5} />
                  </div>

                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br from-slate-900 to-slate-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {index + 1}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow Connector - Hidden on last item */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 transform -translate-y-1/2 text-slate-300 z-10">
                    <IconArrowRight size={24} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 border border-blue-100">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
            Why Choose Travel Buddy?
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Safe & Verified",
                description:
                  "All users are verified to ensure a safe and trustworthy community.",
              },
              {
                title: "Flexible Matching",
                description:
                  "Find buddies with shared interests, budgets, and travel styles.",
              },
              {
                title: "Real Connections",
                description:
                  "Build lasting friendships while exploring the world together.",
              },
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <IconCheck size={24} className="text-green-500" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">
                  {benefit.title}
                </h4>
                <p className="text-slate-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-slate-600 mb-6 text-lg">
            Ready to find your travel buddy?
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-xl transition-all transform hover:scale-105 shadow-lg">
            Start Planning Your Adventure
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;