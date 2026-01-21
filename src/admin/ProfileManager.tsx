import React, { useState } from 'react';
import { useData } from '../services/DataContext';
import { Profile } from '../services/types';
import { Trash2, Edit, Plus, X, Search, User, Briefcase } from 'lucide-react';
import { ImageUpload } from '../components/ImageUpload';

export const ProfileManager: React.FC = () => {
    const { profiles, addProfile, updateProfile, deleteProfile } = useData();
    const [isEditing, setIsEditing] = useState(false);
    const [currentProfile, setCurrentProfile] = useState<Partial<Profile>>({});
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProfiles = (profiles || []).filter(p =>
        p && (
            (p.name && p.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (p.role && p.role.toLowerCase().includes(searchTerm.toLowerCase()))
        )
    );

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const profileData = {
            ...currentProfile,
            type: currentProfile.type || 'Staff'
        } as Profile;

        if (currentProfile.id) {
            await updateProfile(currentProfile.id, profileData);
        } else {
            await addProfile(profileData as Omit<Profile, 'id'>);
        }
        setIsEditing(false);
        setCurrentProfile({});
    };

    const handleEdit = (profile: Profile) => {
        setCurrentProfile(profile);
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this profile?')) {
            await deleteProfile(id);
        }
    };

    if (isEditing) {
        return (
            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{currentProfile.id ? 'Edit Team Member' : 'Add Team Member'}</h2>
                        <p className="text-sm text-gray-500">Profiles appear in the leadership and staff sections.</p>
                    </div>
                    <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors"><X size={24} /></button>
                </div>

                <form onSubmit={handleSave} className="p-10 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="md:col-span-1">
                            <ImageUpload
                                label="Profile Photo"
                                value={currentProfile.imageUrl}
                                onChange={url => setCurrentProfile({ ...currentProfile, imageUrl: url })}
                            />
                            <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <User size={16} className="text-[#0084d1]" />
                                    <span className="text-xs font-bold text-[#0084d1] uppercase mt-0.5">Visibility</span>
                                </div>
                                <p className="text-xs text-gray-600 leading-relaxed">This profile will be visible on the About Us page under the selected category.</p>
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Full Name</label>
                                    <input
                                        required
                                        value={currentProfile.name || ''}
                                        onChange={e => setCurrentProfile({ ...currentProfile, name: e.target.value })}
                                        placeholder="e.g. John Doe"
                                        className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-[#0084d1] outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Category</label>
                                    <select
                                        value={currentProfile.type || 'Staff'}
                                        onChange={e => setCurrentProfile({ ...currentProfile, type: e.target.value as any })}
                                        className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-[#0084d1] outline-none bg-white font-medium"
                                    >
                                        <option value="Staff">Staff</option>
                                        <option value="Board">Board Member</option>
                                        <option value="Volunteer">Volunteer</option>
                                        <option value="Intern">Intern</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Professional Role</label>
                                <div className="relative">
                                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        required
                                        value={currentProfile.role || ''}
                                        onChange={e => setCurrentProfile({ ...currentProfile, role: e.target.value })}
                                        placeholder="e.g. Director of Security"
                                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0084d1] outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Biography</label>
                                <textarea
                                    required
                                    value={currentProfile.bio || ''}
                                    onChange={e => setCurrentProfile({ ...currentProfile, bio: e.target.value })}
                                    className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-[#0084d1] outline-none h-40 resize-none leading-relaxed"
                                    placeholder="Write a short bio about this person's background and expertise..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-10 border-t border-gray-100">
                        <button type="button" onClick={() => setIsEditing(false)} className="px-8 py-4 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors">Cancel</button>
                        <button type="submit" className="px-12 py-4 rounded-xl font-bold bg-[#0084d1] text-white hover:bg-[#006bb0] shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]">
                            {currentProfile.id ? 'Update Profile' : 'Add to Team'}
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                <div className="relative w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search team by name or role..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#0084d1] focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium"
                    />
                </div>
                <button onClick={() => { setCurrentProfile({}); setIsEditing(true); }} className="flex items-center gap-2 bg-[#0084d1] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#006bb0] shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]">
                    <Plus size={20} /> Add Team Member
                </button>
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Team Member</th>
                            <th className="p-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="p-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="p-6 text-sm font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredProfiles.length > 0 ? filteredProfiles.map(profile => (
                            <tr key={profile.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="p-6 font-medium text-gray-900 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-gray-100 overflow-hidden shadow-sm">
                                        <img src={profile.imageUrl || 'https://via.placeholder.com/100'} alt={profile.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-gray-900">{profile.name}</span>
                                        <span className="text-xs text-gray-500">ID: {profile.id.substring(0, 8)}...</span>
                                    </div>
                                </td>
                                <td className="p-6 text-gray-600 font-medium">{profile.role}</td>
                                <td className="p-6">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${profile.type === 'Board' ? 'bg-purple-100 text-purple-600' :
                                        profile.type === 'Volunteer' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                                        }`}>
                                        {profile.type}
                                    </span>
                                </td>
                                <td className="p-6 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => handleEdit(profile)} className="p-2 text-gray-400 hover:text-[#0084d1] hover:bg-blue-50 rounded-xl transition-all"><Edit size={20} /></button>
                                        <button onClick={() => handleDelete(profile.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={20} /></button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={4} className="p-20 text-center">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                                            <User size={40} />
                                        </div>
                                        <p className="text-gray-500 font-medium italic">No team members found matching your search.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
