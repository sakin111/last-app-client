import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Search, UserPlus, Users } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF8F0] via-[#FFE8D6] to-[#FFDBC5] dark:from-[#1a1410] dark:via-[#1f1815] dark:to-[#231c18] min-h-[90vh] flex items-center">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-orange-200/40 to-amber-100/20 blur-3xl dark:from-orange-900/20 dark:to-amber-900/10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-blue-100/30 to-cyan-50/20 blur-3xl dark:from-blue-900/10 dark:to-cyan-900/10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/70 dark:bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5 border border-orange-200/50 dark:border-orange-800/30 shadow-sm">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                2,500+ travelers online now
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-gray-900 dark:text-white">
              Find Your Perfect{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-400 dark:to-amber-400">
                Travel
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-400 dark:to-amber-400">
                Buddy
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
              Our intelligent travel companion algorithm matches you with
              like-minded travelers, so you never have to explore the world alone.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/travel">
                <Button
                  size="lg"
                  className="bg-[#1B2E4B] hover:bg-[#15253d] text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl hover:shadow-[#1B2E4B]/25 transition-all duration-300 group w-full sm:w-auto"
                >
                  <Search className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Find a Travel Buddy
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 py-6 text-base font-semibold border-2 border-[#1B2E4B] text-[#1B2E4B] hover:bg-[#1B2E4B] hover:text-white transition-all duration-300 group dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-400 dark:hover:text-gray-900 w-full sm:w-auto"
                >
                  <UserPlus className="mr-2 h-5 w-5" />
                  Create Profile
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[
                  "bg-gradient-to-br from-orange-400 to-rose-400",
                  "bg-gradient-to-br from-blue-400 to-cyan-400",
                  "bg-gradient-to-br from-green-400 to-emerald-400",
                  "bg-gradient-to-br from-purple-400 to-pink-400",
                ].map((bg, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-full ${bg} border-2 border-white dark:border-gray-800 flex items-center justify-center shadow-md`}
                  >
                    <Users className="w-4 h-4 text-white" />
                  </div>
                ))}
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white text-lg">
                  50,000+
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Happy travelers matched
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Image Collage */}
          <div className="relative hidden lg:block">
            <div className="relative w-full h-[600px]">
              {/* Main large image */}
              <div className="absolute top-0 right-0 w-[340px] h-[420px] rounded-3xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 border-4 border-white dark:border-gray-800">
                <Image
                  src="https://res.cloudinary.com/dmbf41o2r/image/upload/v1762333042/file-1762333038535-590325258.jpg"
                  alt="Travel destination - Bali"
                  fill
                  className="object-cover"
                  sizes="340px"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <p className="text-white font-semibold text-lg">
                    Bali, Indonesia
                  </p>
                  <p className="text-white/80 text-sm">Popular Destination</p>
                </div>
              </div>

              {/* Secondary image */}
              <div className="absolute top-16 left-0 w-[260px] h-[300px] rounded-3xl overflow-hidden shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-500 border-4 border-white dark:border-gray-800">
                <Image
                  src="/images/home/hero-travelers.png"
                  alt="Happy travelers"
                  fill
                  className="object-cover"
                  sizes="260px"
                />
              </div>

              {/* Small floating card */}
              <div className="absolute bottom-12 left-8 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl backdrop-blur-sm border border-gray-100 dark:border-gray-700 animate-bounce-slow z-20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      New Match Found!
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      98% compatibility
                    </p>
                  </div>
                </div>
              </div>

              {/* Rating badge */}
              <div className="absolute bottom-4 right-20 bg-white dark:bg-gray-800 rounded-2xl px-4 py-3 shadow-xl border border-gray-100 dark:border-gray-700 z-20">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    4.9
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
