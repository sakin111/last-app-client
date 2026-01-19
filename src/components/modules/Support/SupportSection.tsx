export default function SupportSection() {
    return (
        <section className="min-h-screen py-16 px-4 bg-background">
            <div className="mx-auto max-w-3xl">

                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        What We Offer
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Typers is your trusted travel companion, designed to make every journey memorable and hassle-free.
                    </p>
                </div>


                <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">Find Your Travel Buddy</h2>
                        <p>
                            Traveling alone doesn&apos;t mean you have to be lonely. Typers connects you with like-minded travelers heading to the same destinations. Whether you&apos;re looking to share costs, explore together, or simply have someone to grab dinner with, we help you find the perfect travel companion.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">Community-Driven Recommendations</h2>
                        <p>
                            Skip the tourist traps and discover authentic experiences. Our community of travelers shares real insights about destinations, from hidden local restaurants to breathtaking viewpoints that aren&apos;t in any guidebook. Learn from those who&apos;ve been there before.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">Safe & Verified Profiles</h2>
                        <p>
                            Your safety is our priority. All members go through a verification process, and our rating system ensures you can travel with confidence. Connect with trusted travelers and build meaningful connections along the way.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">Trip Planning Made Easy</h2>
                        <p>
                            Plan your perfect trip with our collaborative tools. Create itineraries, share routes with your travel group, and coordinate meetups effortlessly. Everything you need to organize your adventure is in one place.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">24/7 Support</h2>
                        <p>
                            Got questions or need help? Our dedicated support team is available around the clock to assist you. From technical issues to travel advice, we&apos;re here to ensure your experience with Typers is smooth and enjoyable.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">Flexible Subscription Plans</h2>
                        <p>
                            Choose a plan that fits your travel style. Whether you&apos;re a weekend explorer or a full-time nomad, our subscription options give you access to premium features that enhance your travel experience.
                        </p>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border text-center">
                    <p className="text-muted-foreground">
                        Have questions? Reach out to us at{" "}
                        <a href="mailto:support@typers.com" className="text-primary hover:underline">
                            support@typers.com
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}
