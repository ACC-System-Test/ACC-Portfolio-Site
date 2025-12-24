
import React from 'react';
import { ArrowDown } from 'lucide-react';

const Box = ({ text, className = "" }: { text: string; className?: string }) => (
  <div className={`bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-center font-semibold text-gray-700 text-sm ${className}`}>
    {text}
  </div>
);

export const OrganizationStructure = () => {
  return (
    <div className="bg-gray-50 p-12 rounded-3xl overflow-x-auto">
      <div className="min-w-[800px] flex flex-col items-center gap-12">
        {/* Level 1 */}
        <div className="flex gap-8">
          <Box text="Advisory Board" className="w-48 py-8" />
          <Box text="Board Of Directors" className="w-48 py-8" />
          <Box text="Board Of Trustees" className="w-48 py-8" />
        </div>

        {/* Level 2 connection */}
        <ArrowDown className="text-gray-400" size={32} />

        {/* Level 3 */}
        <Box text="Office Of The Chief Executive Officer" className="w-72 py-10 bg-blue-50 border-blue-100 text-[#0084d1] text-lg" />

        {/* Level 4 connection line */}
        <div className="w-[80%] h-[2px] bg-gray-300 relative">
            <div className="absolute left-0 top-0 w-[2px] h-8 bg-gray-300"></div>
            <div className="absolute left-1/3 top-0 w-[2px] h-8 bg-gray-300"></div>
            <div className="absolute left-2/3 top-0 w-[2px] h-8 bg-gray-300"></div>
            <div className="absolute left-full top-0 w-[2px] h-8 bg-gray-300"></div>
        </div>

        {/* Level 5 */}
        <div className="grid grid-cols-4 gap-6 w-full">
          <Box text="Training And Awareness Division" className="h-24" />
          <Box text="Research & Development Division" className="h-24" />
          <Box text="Professional Empowerment Division" className="h-24" />
          <Box text="Certification & Award Division" className="h-24" />
        </div>
      </div>
    </div>
  );
};
