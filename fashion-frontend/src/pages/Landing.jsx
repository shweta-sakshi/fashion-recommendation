import { Fliptext } from "@/components/fliptext";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export function Landing() {
    return (
        <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center">
            <Navbar />
            <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
                <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
            </div>
            <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
                <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
                <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            </div>
            <div className="px-4 py-10 md:py-20">
                <div className="flex justify-center">
                    <Fliptext />
                </div>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 }}
                    className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
                >
                    From casual to formal, day to night - discover clothing combinations that match your personality and make you feel confident.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 1 }}
                    className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
                >
                    <Link to='/login'>
                        <button className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                            Get Recommendations
                        </button>
                    </Link>
                    <Link to='/contact'>
                        <button className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
                            Fashion Support
                        </button>
                    </Link>
                </motion.div>

                {/* Updated image section with more information */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 1.2 }}
                    className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
                >
                    <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
                        {/* Fashion recommendation mockup */}
                        <div className="aspect-[16/9] bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white">
                            <div className="h-full flex flex-col justify-center">
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold mb-2">AI-Powered Style Matching</h3>
                                    <p className="text-gray-300">Personalized recommendations based on your measurements & preferences</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                                    {/* User Profile */}
                                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <h4 className="font-semibold">Your Profile</h4>
                                            <p className="text-sm text-gray-300 mt-1">Measurements & Style Preferences</p>
                                        </div>
                                    </div>

                                    {/* AI Analysis */}
                                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                                                </svg>
                                            </div>
                                            <h4 className="font-semibold">AI Analysis</h4>
                                            <p className="text-sm text-gray-300 mt-1">Smart Matching Algorithm</p>
                                        </div>
                                    </div>

                                    {/* Recommendations */}
                                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                                </svg>
                                            </div>
                                            <h4 className="font-semibold">Perfect Match</h4>
                                            <p className="text-sm text-gray-300 mt-1">Curated Style Suggestions</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 text-center">
                                    <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                        <span className="text-sm">Analyzing your style preferences...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Additional information section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 1.4 }}
                    className="relative z-10 mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    <div className="text-center p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800">
                        <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-neutral-100">Precise Measurements</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">Enter your body measurements for perfectly fitted recommendations</p>
                    </div>

                    <div className="text-center p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800">
                        <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-neutral-100">Style Preferences</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">Define your style from casual to formal, colors, and occasions</p>
                    </div>

                    <div className="text-center p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800">
                        <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-neutral-100">Perfect Match</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">Get personalized outfit combinations that make you look and feel great</p>
                    </div>
                </motion.div>

                {/* Pricing Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 1.6 }}
                    className="relative z-10 mt-20"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">Choose Your Style Journey</h2>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400">Select the perfect plan for your fashion needs</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Basic Plan */}
                        <div className="relative p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm">
                            <div className="text-center">
                                <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-100">Basic</h3>
                                <div className="mb-6">
                                    <span className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">$0</span>
                                    <span className="text-neutral-600 dark:text-neutral-400">/month</span>
                                </div>
                                <ul className="space-y-3 mb-8 text-left">
                                    <li className="flex items-center text-neutral-700 dark:text-neutral-300">
                                        <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        5 outfit recommendations/month
                                    </li>
                                    <li className="flex items-center text-neutral-700 dark:text-neutral-300">
                                        <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Basic style analysis
                                    </li>
                                    <li className="flex items-center text-neutral-700 dark:text-neutral-300">
                                        <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Email support
                                    </li>
                                </ul>
                                <Link to='/login'>
                                    <button className="w-full py-3 px-6 rounded-lg border border-gray-300 bg-white text-black font-medium transition-all duration-300 hover:bg-gray-50 dark:border-gray-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700">
                                        Get Started
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Premium Plan */}
                        <div className="relative p-8 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white transform scale-105">
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-semibold mb-2">Premium</h3>
                                <div className="mb-6">
                                    <span className="text-4xl font-bold">$19</span>
                                    <span className="text-blue-100">/month</span>
                                </div>
                                <ul className="space-y-3 mb-8 text-left">
                                    <li className="flex items-center">
                                        <svg className="w-5 h-5 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Unlimited outfit recommendations
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-5 h-5 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Advanced AI style analysis
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-5 h-5 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Seasonal wardrobe planning
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-5 h-5 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Priority support
                                    </li>
                                </ul>
                                <button className="w-full py-3 px-6 rounded-lg bg-white text-purple-600 font-medium transition-all duration-300 hover:bg-gray-100">
                                    Start Premium
                                </button>
                            </div>
                        </div>

                        {/* Pro Plan */}
                        <div className="relative p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm">
                            <div className="text-center">
                                <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-100">Pro</h3>
                                <div className="mb-6">
                                    <span className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">$39</span>
                                    <span className="text-neutral-600 dark:text-neutral-400">/month</span>
                                </div>
                                <ul className="space-y-3 mb-8 text-left">
                                    <li className="flex items-center text-neutral-700 dark:text-neutral-300">
                                        <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Everything in Premium
                                    </li>
                                    <li className="flex items-center text-neutral-700 dark:text-neutral-300">
                                        <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Personal stylist consultation
                                    </li>
                                    <li className="flex items-center text-neutral-700 dark:text-neutral-300">
                                        <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Custom shopping lists
                                    </li>
                                    <li className="flex items-center text-neutral-700 dark:text-neutral-300">
                                        <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        24/7 dedicated support
                                    </li>
                                </ul>
                                <button className="w-full py-3 px-6 rounded-lg bg-black text-white font-medium transition-all duration-300 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                                    Go Pro
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Footer */}
            <footer className="mt-20 border-t border-neutral-200 dark:border-neutral-800 bg-white/30 dark:bg-neutral-900/30 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Brand */}
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="size-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
                                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">Fashion Recommender</h3>
                            </div>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-4 max-w-md">
                                Discover your perfect style with AI-powered fashion recommendations tailored to your measurements, preferences, and lifestyle.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                    </svg>
                                </a>
                                <a href="#" className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                                    </svg>
                                </a>
                                <a href="#" className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.719-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.376-.629-.516 1.909-2.236 2.445-2.236 2.445C3.757 23.748 7.753 24 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" />
                                    </svg>
                                </a>
                                <a href="#" className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-neutral-100">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><a href="/dashboard" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">Home</a></li>
                                <li><a href="/information" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">About Us</a></li>
                                <li><a href="/howitwork" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">How It Works</a></li>
                                <li><a href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">Pricing</a></li>
                                <li><a href="/contact" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">Contact</a></li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-neutral-100">Support</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">Help Center</a></li>
                                <li><a href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">FAQ</a></li>
                                <li><a href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">Contact Support</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                © 2025 Fashion Recommender. All rights reserved.
                            </p>
                            <div className="flex space-x-6 mt-4 md:mt-0">
                                <a href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 text-sm transition-colors">Privacy</a>
                                <a href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 text-sm transition-colors">Terms</a>
                                <a href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 text-sm transition-colors">Cookies</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

const Navbar = () => {
    return (
        <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
            <div className="flex items-center gap-2">
                <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
                <h1 className="text-base font-bold md:text-2xl">Fashion Recommender</h1>
            </div>
            <div className="flex flex-row gap-2">
                <Link to='/login'>
                    <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                        Login
                    </button>
                </Link>
                <Link to='/signup'>
                    <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                        Sign Up
                    </button>
                </Link>
            </div>
        </nav>
    );
};