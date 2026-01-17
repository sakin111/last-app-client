import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Johnson',
    location: 'New York, USA',
    rating: 5,
    text: 'Found an amazing travel buddy for my Europe trip! We had the best time exploring together. Highly recommend TravelBuddy!',
    avatar: 'SJ',
  },
  {
    name: 'Miguel Rodriguez',
    location: 'Barcelona, Spain',
    rating: 5,
    text: 'As a solo traveler, this platform changed everything for me. Made lifelong friends and discovered places I never would have alone.',
    avatar: 'MR',
  },
  {
    name: 'Yuki Tanaka',
    location: 'Tokyo, Japan',
    rating: 5,
    text: 'Safe, easy to use, and filled with genuine travelers. Met my travel buddy for Southeast Asia and planning our next adventure!',
    avatar: 'YT',
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden dark:bg-gray-900">

      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-liner-to-r from-blue-600 to-indigo-600 dark:text-white">
            What Travelers Say
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto dark:text-gray-300">
            Join thousands of happy travelers who found their perfect travel companions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white group relative overflow-hidden dark:bg-gradient-to-b dark:from-cyan-800 dark:to-gray-90"
            >

              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="h-16 w-16 text-blue-600 dark:text-cyan-200" />
              </div>
              
              <CardContent className="pt-8 pb-8 relative">
                <div className="flex mb-5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed relative z-10">
                  {testimonial.text}
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-liner-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-gray-950 font-semibold text-lg shadow-lg group-hover:scale-110 transition-transform dark:text-white">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;