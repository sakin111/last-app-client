export default function TermsSection() {
    return (
        <section className="min-h-screen py-16 px-4">
            <div className="mx-auto max-w-3xl">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-lg text-gray-600">
                        Last updated: January 2025
                    </p>
                </div>

                <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using Typers, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. User Accounts</h2>
                        <p>
                            You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. You must be at least 18 years old to create an account.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. User Conduct</h2>
                        <p>
                            You agree not to use Typers for any unlawful purpose or in any way that could damage, disable, or impair the platform. You must not harass, abuse, or harm other users. Any violation may result in immediate termination of your account.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Content Ownership</h2>
                        <p>
                            You retain ownership of content you post on Typers. However, by posting content, you grant us a non-exclusive, worldwide, royalty-free license to use, display, and distribute your content in connection with our services.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Subscriptions and Payments</h2>
                        <p>
                            Premium subscriptions are billed in advance on a recurring basis. You can cancel at any time, and your subscription will remain active until the end of the current billing period. Refunds are provided in accordance with our refund policy.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Limitation of Liability</h2>
                        <p>
                            Typers facilitates connections between travelers but is not responsible for the actions of users. We do not guarantee the accuracy of user profiles or the safety of travel arrangements made through our platform. Travel at your own risk.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Changes to Terms</h2>
                        <p>
                            We reserve the right to modify these terms at any time. We will notify users of significant changes via email or through the platform. Continued use of Typers after changes constitutes acceptance of the new terms.
                        </p>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                    <p className="text-gray-600">
                        Questions about our terms?{" "}
                        <a href="mailto:legal@typers.com" className="text-blue-600 hover:underline">
                            legal@typers.com
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}
