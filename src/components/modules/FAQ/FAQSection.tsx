export default function FAQSection() {
    return (
        <section className="min-h-screen py-16 px-4 bg-background">
            <div className="mx-auto max-w-3xl">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Find answers to the most common questions about Typers.
                    </p>
                </div>

                <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">What is Typers?</h2>
                        <p>
                            Typers is a travel companion platform that connects travelers heading to the same destinations. Whether you&apos;re looking for someone to share costs, explore together, or simply want travel advice, Typers helps you find the perfect match.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">Is Typers free to use?</h2>
                        <p>
                            Yes, Typers offers a free tier that allows you to create a profile, browse travelers, and access basic features. For advanced features like priority matching, unlimited messaging, and exclusive deals, we offer premium subscription plans.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">How do I find a travel buddy?</h2>
                        <p>
                            Simply create an account, set up your profile with your travel preferences, and browse travelers heading to your destination. Our matching system will suggest compatible travel companions based on your interests, travel style, and schedule.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">Is it safe to travel with strangers?</h2>
                        <p>
                            Safety is our top priority. All users go through a verification process, and our rating system allows you to see reviews from other travelers. We also offer features like real-time location sharing and emergency contacts to ensure safe travels.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">How do I cancel my subscription?</h2>
                        <p>
                            You can cancel your subscription anytime from your account settings. Your premium features will remain active until the end of your billing period. No questions asked, no hidden fees.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">Can I use Typers for group travel?</h2>
                        <p>
                            Absolutely! Typers supports both one-on-one connections and group travel. You can create or join travel groups, coordinate plans with multiple travelers, and share itineraries with your entire group.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">What if I have issues with another user?</h2>
                        <p>
                            If you encounter any issues with another user, you can report them through our platform. Our safety team reviews all reports and takes appropriate action. You can also block users at any time to prevent further contact.
                        </p>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border text-center">
                    <p className="text-muted-foreground">
                        Still have questions?{" "}
                        <a href="/contact" className="text-primary hover:underline">
                            Contact us
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}
