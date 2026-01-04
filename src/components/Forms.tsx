
import React from 'react';

interface FormProps {
  title: string;
  variant?: 'contact' | 'intern';
}

export const ContactForm: React.FC<FormProps> = ({ title, variant = 'contact' }) => {
  const [status, setStatus] = React.useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setStatus('success');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <div className="bg-[#eef8ff] p-6 sm:p-10 rounded-3xl shadow-sm border border-blue-50 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full blur-[100px] opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"></div>

      <div className="bg-white p-8 rounded-2xl shadow-sm relative z-10">
        <h3 className="text-2xl font-bold text-center text-[#0084d1] mb-8">{title}</h3>

        {status === 'success' ? (
          <div className="bg-green-50 text-green-700 p-6 rounded-xl text-center animate-in fade-in zoom-in duration-300">
            <p className="font-bold text-lg">Message Sent Successfully!</p>
            <p className="text-sm">We'll get back to you shortly.</p>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="First Name"
                className="w-full bg-gray-50 border-none rounded-lg p-4 text-sm focus:ring-2 focus:ring-[#0084d1] outline-none transition-all placeholder:text-gray-400"
              />
              <input
                type="text"
                required
                placeholder="Last Name"
                className="w-full bg-gray-50 border-none rounded-lg p-4 text-sm focus:ring-2 focus:ring-[#0084d1] outline-none transition-all placeholder:text-gray-400"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="email"
                required
                placeholder="Email Address"
                className="w-full bg-gray-50 border-none rounded-lg p-4 text-sm focus:ring-2 focus:ring-[#0084d1] outline-none transition-all placeholder:text-gray-400"
              />
              <input
                type="tel"
                placeholder="Phone (Optional)"
                className="w-full bg-gray-50 border-none rounded-lg p-4 text-sm focus:ring-2 focus:ring-[#0084d1] outline-none transition-all placeholder:text-gray-400"
              />
            </div>
            <textarea
              placeholder="How can we help you?"
              required
              rows={5}
              className="w-full bg-gray-50 border-none rounded-lg p-4 text-sm focus:ring-2 focus:ring-[#0084d1] outline-none resize-none transition-all placeholder:text-gray-400"
            />
            <button className="w-full bg-[#0084d1] hover:bg-[#006bb0] text-white py-4 rounded-lg font-bold transition-all transform active:scale-95 shadow-lg shadow-blue-200">
              Connect With Us
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
