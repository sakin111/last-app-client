import { Card, CardContent } from '@/components/ui/card';
import { Users, Shield, Globe, LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBgColor: string;
  iconColor: string;
}

const features: Feature[] = [
  {
    icon: Users,
    title: 'Verified Travelers',
    description: 'Connect with verified travelers who share your passion for exploration and adventure',
    iconBgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'Your safety is our priority. All profiles are verified and privacy is protected',
    iconBgColor: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    icon: Globe,
    title: 'Global Community',
    description: 'Join thousands of travelers from around the world exploring together',
    iconBgColor: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-liner-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-liner-to-r from-blue-600 to-indigo-600">
            Why Choose TravelBuddy?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            The safest and most trusted platform to find travel companions for your next adventure
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white group"
            >
              <CardContent className="pt-10 pb-10">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${feature.iconBgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-10 w-10 ${feature.iconColor}`} />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}