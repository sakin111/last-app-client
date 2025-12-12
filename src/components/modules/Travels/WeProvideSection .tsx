"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const WeProvideSection = () => {
  const faqs = [
    {
      q: "Travel benefits?",
      a: "we provide best travel benefits for our customers including exclusive discounts, personalized itineraries, and 24/7 support.",
    },
    {
      q: "Your Own match?",
      a: "Yes, we offer a personalized matching service to help you find travel companions who share your interests and travel style.",
    },
    {
      q: "A plan for Security?",
      a: "Absolutely, we prioritize your safety with comprehensive travel insurance options and real-time support during your trips.",
    },
    {
      q: "Good community?",
      a: "Yes, we foster a vibrant travel community where you can connect with fellow travelers, share experiences, and get insider tips.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full min-h-screen bg-white py-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">What We Provides</h1>
          <p className="mt-4 text-gray-600">
            Tap a question to see the answer.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border rounded-lg">

              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full flex justify-between items-center px-5 py-4 text-left text-lg font-medium text-gray-800 focus:outline-none"
              >
                {faq.q}
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    openIndex === idx ? "rotate-180" : ""
                  }`}
                />
              </button>


              {openIndex === idx && (
                <div className="px-5 pb-4 text-gray-600">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WeProvideSection