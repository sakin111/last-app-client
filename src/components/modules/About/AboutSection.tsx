export default function AboutSection() {
    return (
        <section className="min-h-screen py-16 px-4 bg-background">
            <div className="mx-auto max-w-3xl">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        About Us
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        The story behind Typers and our mission to connect travelers worldwide.
                    </p>
                </div>

                <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">Our Story</h2>
                        <p>
                            Typers was born from a simple idea: no one should have to travel alone unless they want to. Founded in 2024, we started as a small community of passionate travelers who believed that the best journeys are shared. What began as a simple platform to connect backpackers has grown into a global community of adventurers, explorers, and wanderers.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">Our Mission</h2>
                        <p>
                            We&apos;re on a mission to make travel more accessible, social, and meaningful. We believe that every destination is better with good company, and every stranger is just a friend you haven&apos;t met yet. Through Typers, we aim to break down barriers, foster cross-cultural connections, and create memories that last a lifetime.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">What Drives Us</h2>
                        <p>
                            Travel has the power to transform lives. It opens our minds, broadens our perspectives, and reminds us of our shared humanity. At Typers, we&apos;re driven by the countless stories of travelers who found friendship, adventure, and even love through our platform. Every connection made is a testament to the power of bringing people together.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">Our Community</h2>
                        <p>
                            Today, Typers is home to thousands of travelers from over 120 countries. From solo backpackers seeking companions to families looking for local guides, our diverse community represents every kind of traveler. We&apos;re proud to have facilitated over 10,000 successful trips and counting.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">Looking Ahead</h2>
                        <p>
                            The journey is just beginning. We&apos;re constantly working to improve our platform, add new features, and expand our reach to more destinations. Our vision is to become the go-to platform for travelers worldwide, making it easier than ever to find your perfect travel buddy and create unforgettable experiences.
                        </p>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border text-center">
                    <p className="text-muted-foreground">
                        Want to join our team?{" "}
                        <a href="mailto:careers@typers.com" className="text-primary hover:underline">
                            careers@typers.com
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}
