import { MapPin, Wallet, Sparkles, ShieldCheck, UserCheck } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Destination",
    description: "Sync with others visiting the same cities/regions.",
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: Wallet,
    title: "Budget",
    description: "Share the cost of travel with other luxury or budget travelers.",
    iconColor: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
  {
    icon: Sparkles,
    title: "Interests",
    description: "Match with people based on hobbies, food, and culture.",
    iconColor: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    icon: ShieldCheck,
    title: "Vibe",
    description: "Find partners with similar travel styles and energy levels.",
    iconColor: "text-teal-500",
    bgColor: "bg-teal-50",
  },
  {
    icon: UserCheck,
    title: "Verified",
    description: "Every profile is manually verified for your peace of mind.",
    iconColor: "text-purple-500",
    bgColor: "bg-purple-50",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Matches Made with Intelligence
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              We don't just find travelers; we find travel counterparts who align with your lifestyle and expectations.
            </p>
          </div>
          <button className="text-orange-500 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
            HOW IT ALL WORKS <span className="text-xl">→</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-3xl border border-transparent hover:border-orange-200 dark:hover:border-orange-900/30 transition-all duration-300 group"
            >
              <div className={`${feature.bgColor} dark:bg-gray-800 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;