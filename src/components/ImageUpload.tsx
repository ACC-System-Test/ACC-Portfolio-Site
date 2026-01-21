import React, { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { uploadImage } from '../services/upload';

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    label?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, label = "Feature Image" }) => {
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleUpload = async (file: File) => {
        try {
            setUploading(true);
            setError(null);
            const url = await uploadImage(file);
            onChange(url);
        } catch (err: any) {
            setError(err.response?.data?.message || "Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleUpload(file);
    }, []);

    const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleUpload(file);
    };

    return (
        <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">{label}</label>

            {value ? (
                <div className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-video bg-gray-50">
                    <img src={value} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                            type="button"
                            onClick={() => onChange('')}
                            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={onDrop}
                    className={`
                        relative border-2 border-dashed rounded-xl p-8 transition-all flex flex-col items-center justify-center gap-3 cursor-pointer
                        ${dragActive ? 'border-[#0084d1] bg-blue-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}
                        ${uploading ? 'pointer-events-none opacity-60' : ''}
                    `}
                    onClick={() => document.getElementById('fileInput')?.click()}
                >
                    <input
                        id="fileInput"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={onFileSelect}
                    />

                    {uploading ? (
                        <Loader2 className="animate-spin text-[#0084d1]" size={32} />
                    ) : (
                        <>
                            <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0084d1] flex items-center justify-center">
                                <Upload size={24} />
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-gray-900">Click or drag to upload</p>
                                <p className="text-xs text-gray-500">JPG, PNG, WebP up to 5MB</p>
                            </div>
                        </>
                    )}
                </div>
            )}

            {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
        </div>
    );
};
