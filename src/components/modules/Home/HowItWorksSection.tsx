interface Step {
  number: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: 'Create Your Profile',
    description: 'Sign up and tell us about yourself, your travel preferences, and interests',
  },
  {
    number: 2,
    title: 'Browse Travelers',
    description: 'Explore travel plans and find travelers heading to your dream destination',
  },
  {
    number: 3,
    title: 'Connect & Chat',
    description: 'Send requests and start conversations with potential travel buddies',
  },
  {
    number: 4,
    title: 'Travel Together',
    description: 'Plan your adventure together and create unforgettable memories',
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">

      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-liner-to-r from-blue-600 to-indigo-600">
            How It Works
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Getting started is easy. Follow these simple steps to find your travel buddy
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative group">

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-liner-to-r from-blue-600 to-indigo-600 opacity-20 group-hover:opacity-40 transition-opacity"></div>
              )}
              
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-liner-to-br from-blue-600 to-indigo-600 text-black text-2xl font-bold mb-6 shadow-lg group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-blue-500/50 transition-all duration-300">
                  {step.number}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default HowItWorksSection;
