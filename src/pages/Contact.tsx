import React from 'react';
import { ContactForm } from '../components/Forms';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export const Contact: React.FC = () => {
    return (
        <div className="space-y-24 pb-24 animate-in fade-in duration-700">
            <section className="hero-gradient h-[50vh] min-h-[400px] flex items-center relative">
                <div className="container mx-auto px-6 max-w-7xl pt-20">
                    <h1 className="text-6xl font-extrabold text-white mb-6">Let's Talk Security</h1>
                    <p className="text-xl text-white/90 max-w-2xl leading-relaxed">
                        Available for collaboration, policy consulting, and organizational training.
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div>
                        <p className="text-[#0084d1] text-sm font-bold uppercase tracking-widest mb-4">Connect With Us</p>
                        <h2 className="text-5xl font-bold text-gray-900 mb-10 leading-tight">We are here to help you grow securely.</h2>

                        <div className="space-y-10">
                            <div className="flex gap-6 items-start">
                                <div className="bg-blue-50 p-4 rounded-2xl text-[#0084d1]">
                                    <MapPin size={28} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Our Headquarters</h4>
                                    <p className="text-gray-600">Cyber Hub, Plot 2231, Financial District<br />Kigali, Rwanda</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start">
                                <div className="bg-blue-50 p-4 rounded-2xl text-[#0084d1]">
                                    <Phone size={28} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Call Us</h4>
                                    <p className="text-gray-600">+250 788 000 000<br />+250 789 111 222</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start">
                                <div className="bg-blue-50 p-4 rounded-2xl text-[#0084d1]">
                                    <Mail size={28} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Email Us</h4>
                                    <p className="text-gray-600">contact@acc-africa.org<br />support@acc-africa.org</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 flex gap-6">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                                <a key={idx} href="#" className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#0084d1] hover:text-white hover:scale-110 transition-all shadow-sm">
                                    <Icon size={24} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <ContactForm title="Send us a direct message" />
                    </div>
                </div>
            </section>

            {/* Interactive Map */}
            <section className="container mx-auto px-6 max-w-7xl">
                <div className="h-[500px] w-full rounded-[3rem] overflow-hidden border border-gray-200 relative shadow-lg">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.4974!2d30.0614!3d-1.9441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca4258c8c8c8d%3A0x8c8c8c8c8c8c8c8c!2sKigali!5e0!3m2!1sen!2srw!4v1699123456789!5m2!1sen!2srw"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full"
                        title="ACC Headquarters Location - Cyber Hub, Kigali, Rwanda"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-md border border-gray-200">
                        <div className="flex items-center gap-2">
                            <MapPin size={20} className="text-[#0084d1]" />
                            <p className="text-sm font-semibold text-gray-900">Cyber Hub, Kigali</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
