import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Clock, MessageSquare } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setSubmitted(true);
            // Reset form after 3 seconds
            setTimeout(() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', subject: '', message: '' });
            }, 3000);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const contactInfo = [
        {
            icon: <Mail className="w-5 h-5" />,
            title: "Email",
            details: "hello@yourcompany.com",
            subtitle: "Send us an email anytime"
        },
        {
            icon: <Phone className="w-5 h-5" />,
            title: "Phone",
            details: "+1 (555) 123-4567",
            subtitle: "Mon-Fri from 8am to 5pm"
        },
        {
            icon: <MapPin className="w-5 h-5" />,
            title: "Office",
            details: "123 Business St, Suite 100",
            subtitle: "San Francisco, CA 94107"
        }
    ];

    return (
        <div className="min-h-screen mt-25 bg-gray-900 text-gray-100">
            {/* Header */}
            <div className="bg-gray-800 border-b border-gray-700">
                <div className="max-w-6xl mx-auto px-4 py-16">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Have a question or want to work together? We'd love to hear from you.
                            Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                                <MessageSquare className="w-6 h-6 text-blue-400" />
                                Contact Information
                            </h2>
                            <div className="space-y-6">
                                {contactInfo.map((item, index) => (
                                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
                                        <div className="text-blue-400 mt-1">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">{item.title}</h3>
                                            <p className="text-gray-300">{item.details}</p>
                                            <p className="text-sm text-gray-400 mt-1">{item.subtitle}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Response Time */}
                        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                            <div className="flex items-center gap-3 mb-4">
                                <Clock className="w-5 h-5 text-green-400" />
                                <h3 className="font-semibold">Response Time</h3>
                            </div>
                            <p className="text-gray-300">
                                We typically respond to all inquiries within 24 hours during business days.
                                For urgent matters, please call us directly.
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                        <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>

                        {submitted ? (
                            <div className="text-center py-8">
                                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                                <p className="text-gray-300">
                                    Thank you for your message. We'll get back to you soon.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Name Field */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2 bg-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-600'
                                            }`}
                                        placeholder="Your full name"
                                        aria-describedby={errors.name ? 'name-error' : undefined}
                                    />
                                    {errors.name && (
                                        <p id="name-error" className="mt-1 text-sm text-red-400 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2 bg-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-600'
                                            }`}
                                        placeholder="your.email@example.com"
                                        aria-describedby={errors.email ? 'email-error' : undefined}
                                    />
                                    {errors.email && (
                                        <p id="email-error" className="mt-1 text-sm text-red-400 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Subject Field */}
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2 bg-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.subject ? 'border-red-500' : 'border-gray-600'
                                            }`}
                                        placeholder="What's this about?"
                                        aria-describedby={errors.subject ? 'subject-error' : undefined}
                                    />
                                    {errors.subject && (
                                        <p id="subject-error" className="mt-1 text-sm text-red-400 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.subject}
                                        </p>
                                    )}
                                </div>

                                {/* Message Field */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        className={`w-full px-3 py-2 bg-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical ${errors.message ? 'border-red-500' : 'border-gray-600'
                                            }`}
                                        placeholder="Tell us more about your inquiry..."
                                        aria-describedby={errors.message ? 'message-error' : undefined}
                                    />
                                    {errors.message && (
                                        <p id="message-error" className="mt-1 text-sm text-red-400 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.message}
                                        </p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <Send className="w-4 h-4" />
                                    Send Message
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;