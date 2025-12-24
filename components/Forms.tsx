
import React from 'react';

interface FormProps {
  title: string;
  variant?: 'contact' | 'intern';
}

export const ContactForm: React.FC<FormProps> = ({ title, variant = 'contact' }) => {
  return (
    <div className="bg-[#eef8ff] p-6 sm:p-10 rounded-3xl shadow-sm border border-blue-50">
      <div className="bg-white p-8 rounded-2xl shadow-sm">
        <h3 className="text-2xl font-bold text-center text-[#0084d1] mb-8">{title}</h3>
        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full bg-gray-50 border-none rounded-lg p-4 text-sm focus:ring-2 focus:ring-[#0084d1] outline-none" 
            />
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full bg-gray-50 border-none rounded-lg p-4 text-sm focus:ring-2 focus:ring-[#0084d1] outline-none" 
            />
          </div>
          <input 
            type="text" 
            placeholder="Your Name" 
            className="w-full bg-gray-50 border-none rounded-lg p-4 text-sm focus:ring-2 focus:ring-[#0084d1] outline-none" 
          />
          <textarea 
            placeholder="Type Your Message" 
            rows={5}
            className="w-full bg-gray-50 border-none rounded-lg p-4 text-sm focus:ring-2 focus:ring-[#0084d1] outline-none resize-none" 
          />
          <button className="w-full bg-[#0084d1] hover:bg-[#006bb0] text-white py-4 rounded-lg font-bold transition-all">
            Connect With Us
          </button>
        </form>
      </div>
    </div>
  );
};
