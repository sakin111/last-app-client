export default function ServicesSection() {
    return (
        <section className="min-h-screen py-16 px-4 bg-background">
            <div className="mx-auto max-w-3xl">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Our Services
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Discover the range of services we offer to make your travel experience seamless and enjoyable.
                    </p>
                </div>

                <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">Travel Buddy Matching</h2>
                        <p>
                            Our intelligent matching system connects you with compatible travel companions based on your interests, travel style, budget, and destinations. Whether you prefer adventure travel, cultural exploration, or relaxing beach vacations, we&apos;ll help you find the perfect partner for your journey.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">Trip Planning Tools</h2>
                        <p>
                            Create detailed itineraries, set meeting points, coordinate schedules, and share travel plans with your group. Our collaborative planning tools make it easy to organize every aspect of your trip, from flights and accommodations to daily activities and restaurant reservations.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">Community Forums</h2>
                        <p>
                            Connect with experienced travelers in our community forums. Ask questions, seek advice, share your experiences, and learn from others who have explored your dream destinations. Our active community is always ready to help fellow travelers.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">Local Guides Network</h2>
                        <p>
                            Access our network of verified local guides who can show you the authentic side of any destination. From hidden gems to local customs, our guides provide insider knowledge that transforms ordinary trips into extraordinary adventures.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">Safety Features</h2>
                        <p>
                            Travel with peace of mind using our safety features. Profile verification, real-time location sharing with trusted contacts, emergency assistance, and our rating system ensure you can connect with trustworthy travelers and stay safe throughout your journey.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">Premium Subscriptions</h2>
                        <p>
                            Unlock advanced features with our premium subscription plans. Get priority matching, unlimited messaging, exclusive travel deals, early access to new features, and dedicated customer support. Choose the plan that best fits your travel frequency and needs.
                        </p>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border text-center">
                    <p className="text-muted-foreground">
                        Ready to get started?{" "}
                        <a href="/subscription" className="text-primary hover:underline">
                            View our plans
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}
