export default function HelpCenterSection() {
    return (
        <section className="min-h-screen py-16 px-4 bg-background">
            <div className="mx-auto max-w-3xl">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Help Center
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Everything you need to know to get the most out of Typers.
                    </p>
                </div>

                <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">Getting Started</h2>
                        <p>
                            New to Typers? Start by creating your account and completing your profile. Add your travel preferences, upcoming destinations, and a bit about yourself. The more complete your profile, the better matches you&apos;ll receive.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">Creating Your Profile</h2>
                        <p>
                            Your profile is your travel identity. Include a clear photo, your travel interests, languages you speak, and your travel style (budget, mid-range, luxury). Don&apos;t forget to verify your profile to build trust with other travelers.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">Finding Travel Buddies</h2>
                        <p>
                            Use our search feature to find travelers by destination, dates, or interests. Browse profiles, read reviews, and send connection requests to travelers who match your style. Start conversations and plan your adventure together.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">Planning Your Trip</h2>
                        <p>
                            Once connected, use our trip planning tools to create shared itineraries. Add destinations, accommodations, activities, and meeting points. All trip members can view and contribute to the plan in real-time.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">Managing Your Account</h2>
                        <p>
                            Access your account settings to update your profile, manage notifications, view your subscription status, and adjust privacy settings. You can also download your data or delete your account at any time.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">Troubleshooting</h2>
                        <p>
                            Having technical issues? Try clearing your browser cache, updating the app, or checking your internet connection. If problems persist, our support team is available 24/7 to help you resolve any issues.
                        </p>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border text-center">
                    <p className="text-muted-foreground">
                        Need more help?{" "}
                        <a href="mailto:support@typers.com" className="text-primary hover:underline">
                            support@typers.com
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}
