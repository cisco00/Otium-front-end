"use client";

import { LandingPage } from "@/components/LandingPage";
import { PreAuthHeader } from "@/components/PreAuthHeader";
import { useUser } from "@/context/UserContext";

export default function Home() {
    const { navigate, setAuthView } = useUser();

    return (
        <>
            <PreAuthHeader onNavigate={navigate} />
            <LandingPage
                onNavigate={navigate}
                onLogin={() => navigate("login")}
                onRegisterRenter={() => navigate("register-renter")}
                onRegisterOwner={() => navigate("register-owner")}
            />

            {/* Footer - copied from App.tsx since it wasn't a separate component yet */}
            <footer className="bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-900 text-white py-12 mt-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div>
                            <h3 className="font-semibold mb-4 text-yellow-400">About</h3>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li><a href="#" className="hover:text-yellow-400">How it works</a></li>
                                <li><a href="#" className="hover:text-yellow-400">About Otium</a></li>
                                <li><a href="#" className="hover:text-yellow-400">Careers</a></li>
                                <li><a href="#" className="hover:text-yellow-400">Press</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4 text-yellow-400">Support</h3>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li><a href="#" className="hover:text-yellow-400">Help Center</a></li>
                                <li><a href="#" className="hover:text-yellow-400">Safety Information</a></li>
                                <li><a href="#" className="hover:text-yellow-400">Cancellation Policy</a></li>
                                <li><a href="#" className="hover:text-yellow-400">Contact Us</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4 text-yellow-400">Hosting</h3>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li><a href="#" className="hover:text-yellow-400">List Your Property</a></li>
                                <li><a href="#" className="hover:text-yellow-400">Host Resources</a></li>
                                <li><a href="#" className="hover:text-yellow-400">Community Forum</a></li>
                                <li><a href="#" className="hover:text-yellow-400">Responsible Hosting</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4 text-yellow-400">Legal</h3>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li><a href="#" className="hover:text-yellow-400">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-yellow-400">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-yellow-400">GDPR Compliance</a></li>
                                <li><a href="#" className="hover:text-yellow-400">Data Protection</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-teal-700 mt-8 pt-8 text-center text-sm text-gray-300">
                        <p className="text-yellow-400 font-semibold text-lg mb-2">Otium</p>
                        <p>© 2026 Otium. All rights reserved.</p>
                        <p className="mt-2">
                            Secure payments powered by Paystack, Flutterwave, and bank transfers.
                        </p>
                        <p className="mt-2 text-xs">
                            This platform is not meant for collecting PII or securing highly sensitive data.
                            All data is encrypted and handled in compliance with GDPR, CCPA, and Nigerian data protection regulations.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}
