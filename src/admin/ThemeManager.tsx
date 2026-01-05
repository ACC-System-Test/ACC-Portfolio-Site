import React, { useState } from 'react';
import { useData } from '../services/DataContext';
import { Save } from 'lucide-react';

export const ThemeManager: React.FC = () => {
    const { theme, updateTheme } = useData();
    const [config, setConfig] = useState(theme);

    const handleChange = (key: string, value: string) => {
        const newConfig = { ...config, [key]: value };
        setConfig(newConfig);
        // Live preview applied via DataContext effect if we save, but local preview needs state
        // For now, we save on button click, but maybe we want live preview?
        // Let's just update local state and have a save button.
    };

    const handleSave = () => {
        updateTheme(config);
        alert('Theme updated successfully!');
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">Theme Customizer</h2>
                <p className="text-gray-500 mb-8">Customize the look and feel of your website. Changes affect the entire portal immediately.</p>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Primary Color</label>
                        <div className="flex items-center gap-4">
                            <input
                                type="color"
                                value={config.primaryColor}
                                onChange={e => handleChange('primaryColor', e.target.value)}
                                className="w-16 h-16 rounded-xl border-none cursor-pointer"
                            />
                            <input
                                type="text"
                                value={config.primaryColor}
                                onChange={e => handleChange('primaryColor', e.target.value)}
                                className="flex-1 border border-gray-200 rounded-xl p-4 font-mono uppercase"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Secondary Color</label>
                        <div className="flex items-center gap-4">
                            <input
                                type="color"
                                value={config.secondaryColor}
                                onChange={e => handleChange('secondaryColor', e.target.value)}
                                className="w-16 h-16 rounded-xl border-none cursor-pointer"
                            />
                            <input
                                type="text"
                                value={config.secondaryColor}
                                onChange={e => handleChange('secondaryColor', e.target.value)}
                                className="flex-1 border border-gray-200 rounded-xl p-4 font-mono uppercase"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Font Family</label>
                        <select
                            value={config.fontFamily}
                            onChange={e => handleChange('fontFamily', e.target.value)}
                            className="w-full border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-[#0084d1]"
                        >
                            <option value="'Bricolage Grotesque', sans-serif">Bricolage Grotesque (Brand)</option>
                            <option value="'Inter', sans-serif">Inter (Modern)</option>
                            <option value="'Roboto', sans-serif">Roboto (Clean)</option>
                            <option value="'Merriweather', serif">Merriweather (Classic)</option>
                            <option value="'Courier New', monospace">Courier (Tech)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Border Radius</label>
                        <div className="flex items-center gap-4">
                            <input
                                type="range"
                                min="0" max="2" step="0.1"
                                value={parseFloat(config.borderRadius)}
                                onChange={e => handleChange('borderRadius', `${e.target.value}rem`)}
                                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0084d1]"
                            />
                            <span className="font-mono text-gray-500 w-16 text-right">{config.borderRadius}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleSave}
                        className="w-full bg-[#0084d1] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#006bb0] transition-colors flex items-center justify-center gap-2"
                        style={{ backgroundColor: config.primaryColor }}
                    >
                        <Save size={20} /> Save Changes
                    </button>

                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 flex gap-4 items-center">
                        <div className="w-12 h-12 rounded-lg bg-primary text-white flex items-center justify-center font-bold" style={{ backgroundColor: config.primaryColor, borderRadius: config.borderRadius }}>
                            A
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900" style={{ fontFamily: config.fontFamily }}>Preview Typography</h4>
                            <p className="text-gray-500 text-sm" style={{ fontFamily: config.fontFamily }}>This is how your content will look.</p>
                        </div>
                        <button className="ml-auto px-4 py-2 border border-primary text-primary font-bold rounded-lg" style={{ borderColor: config.primaryColor, color: config.primaryColor, borderRadius: config.borderRadius, fontFamily: config.fontFamily }}>
                            Button
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
