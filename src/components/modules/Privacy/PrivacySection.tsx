export default function PrivacySection() {
    return (
        <section className="min-h-screen py-16 px-4 bg-background">
            <div className="mx-auto max-w-3xl">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Last updated: January 2025
                    </p>
                </div>

                <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">1. Information We Collect</h2>
                        <p>
                            We collect information you provide directly, such as your name, email, profile details, and travel preferences. We also collect usage data, including how you interact with our platform, your device information, and location data when you enable location services.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">2. How We Use Your Information</h2>
                        <p>
                            We use your information to provide and improve our services, match you with compatible travelers, personalize your experience, send relevant notifications, and ensure the safety and security of our platform.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">3. Information Sharing</h2>
                        <p>
                            We do not sell your personal information. We share your profile information with other users as part of our matching service. We may share data with service providers who assist us in operating our platform, and with authorities when required by law.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">4. Data Security</h2>
                        <p>
                            We implement industry-standard security measures to protect your data, including encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">5. Your Rights</h2>
                        <p>
                            You have the right to access, correct, or delete your personal data. You can update your information through your account settings or request data deletion by contacting us. You can also opt out of marketing communications at any time.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">6. Cookies and Tracking</h2>
                        <p>
                            We use cookies and similar technologies to enhance your experience, analyze usage patterns, and deliver personalized content. You can manage cookie preferences through your browser settings, though some features may not work properly without cookies.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">7. Changes to This Policy</h2>
                        <p>
                            We may update this privacy policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review this policy periodically.
                        </p>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border text-center">
                    <p className="text-muted-foreground">
                        Privacy concerns?{" "}
                        <a href="mailto:privacy@typers.com" className="text-primary hover:underline">
                            privacy@typers.com
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}
