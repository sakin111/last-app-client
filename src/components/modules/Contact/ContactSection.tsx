export default function ContactSection() {
    return (
        <section className="min-h-screen py-16 px-4">
            <div className="mx-auto max-w-3xl">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Contact Us
                    </h1>
                    <p className="text-lg text-gray-600">
                        We&apos;d love to hear from you. Reach out to us anytime.
                    </p>
                </div>

                <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">Get In Touch</h2>
                        <p>
                            Have questions, feedback, or just want to say hello? We&apos;re here to help. Our team is dedicated to providing you with the best possible experience, and we value every message we receive from our community.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">General Inquiries</h2>
                        <p>
                            For general questions about Typers, our services, or how to get started, please email us at{" "}
                            <a href="mailto:hello@typers.com" className="text-blue-600 hover:underline">
                                hello@typers.com
                            </a>
                            . We typically respond within 24 hours.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">Customer Support</h2>
                        <p>
                            Need help with your account, subscription, or experiencing technical issues? Our support team is available 24/7 at{" "}
                            <a href="mailto:support@typers.com" className="text-blue-600 hover:underline">
                                support@typers.com
                            </a>
                            . Premium members can also access live chat support through their dashboard.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">Business & Partnerships</h2>
                        <p>
                            Interested in partnering with Typers? Whether you&apos;re a travel agency, hotel, tour operator, or content creator, we&apos;d love to explore collaboration opportunities. Contact us at{" "}
                            <a href="mailto:partners@typers.com" className="text-blue-600 hover:underline">
                                partners@typers.com
                            </a>
                            .
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">Press & Media</h2>
                        <p>
                            For press inquiries, interviews, or media-related requests, please reach out to our communications team at{" "}
                            <a href="mailto:press@typers.com" className="text-blue-600 hover:underline">
                                press@typers.com
                            </a>
                            .
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">Office Location</h2>
                        <p>
                            Typers Headquarters<br />
                            123 Travel Lane<br />
                            Travel City, TC 12345<br />
                            United States
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">Social Media</h2>
                        <p>
                            Stay connected and follow us on social media for travel inspiration, community updates, and more. Find us on Facebook, Instagram, Twitter, and LinkedIn @TypersTravelBuddy.
                        </p>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                    <p className="text-gray-600">
                        We look forward to hearing from you!
                    </p>
                </div>
            </div>
        </section>
    );
}
