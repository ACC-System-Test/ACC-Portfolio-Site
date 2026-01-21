import React, { useState } from 'react';
import { useData } from '../services/DataContext';
import { Event } from '../services/types';
import { Trash2, Edit, Plus, X, Search, Calendar, MapPin } from 'lucide-react';

export const EventManager: React.FC = () => {
    const { events, addEvent, updateEvent, deleteEvent } = useData();
    const [isEditing, setIsEditing] = useState(false);
    const [currentEvent, setCurrentEvent] = useState<Partial<Event>>({});
    const [searchTerm, setSearchTerm] = useState("");

    const filteredEvents = (events || []).filter(e =>
        e && e.title && e.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const eventData = {
            ...currentEvent,
        } as Event;

        if (currentEvent.id) {
            updateEvent(currentEvent.id, eventData);
        } else {
            addEvent(eventData as Omit<Event, 'id'>);
        }
        setIsEditing(false);
        setCurrentEvent({});
    };

    const handleEdit = (event: Event) => {
        setCurrentEvent(event);
        setIsEditing(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this event?')) {
            deleteEvent(id);
        }
    };

    if (isEditing) {
        return (
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold">{currentEvent.id ? 'Edit Event' : 'New Event'}</h2>
                    <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>
                </div>
                <form onSubmit={handleSave} className="p-6 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Event Title</label>
                        <input
                            required
                            value={currentEvent.title || ''}
                            onChange={e => setCurrentEvent({ ...currentEvent, title: e.target.value })}
                            className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#0084d1] outline-none"
                            placeholder="e.g. Cyber Summit 2026"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Date</label>
                            <input
                                required
                                value={currentEvent.date || ''}
                                onChange={e => setCurrentEvent({ ...currentEvent, date: e.target.value })}
                                className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#0084d1] outline-none"
                                placeholder="e.g. Nov 15, 2026"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Type</label>
                            <select
                                value={currentEvent.type || 'In-Person'}
                                onChange={e => setCurrentEvent({ ...currentEvent, type: e.target.value as any })}
                                className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#0084d1] outline-none"
                            >
                                <option value="In-Person">In-Person</option>
                                <option value="Online">Online</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Location</label>
                        <input
                            required
                            value={currentEvent.location || ''}
                            onChange={e => setCurrentEvent({ ...currentEvent, location: e.target.value })}
                            className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#0084d1] outline-none"
                            placeholder="e.g. Kigali Convention Centre"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                        <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 rounded-lg font-bold text-gray-600 hover:bg-gray-100">Cancel</button>
                        <button type="submit" className="px-6 py-2 rounded-lg font-bold bg-[#0084d1] text-white hover:bg-[#006bb0]">Save Event</button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0084d1]"
                    />
                </div>
                <button onClick={() => { setCurrentEvent({}); setIsEditing(true); }} className="flex items-center gap-2 bg-[#0084d1] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#006bb0] transition-colors">
                    <Plus size={18} /> Add Event
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="p-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Event</th>
                            <th className="p-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="p-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Location</th>
                            <th className="p-4 text-sm font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredEvents.map(event => (
                            <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 font-medium text-gray-900">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-50 p-2 rounded-lg text-[#0084d1]">
                                            <Calendar size={18} />
                                        </div>
                                        {event.title}
                                    </div>
                                </td>
                                <td className="p-4 text-gray-600 text-sm">{event.date}</td>
                                <td className="p-4 text-gray-500 text-sm flex items-center gap-2">
                                    <MapPin size={14} /> {event.location}
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => handleEdit(event)} className="p-2 text-gray-400 hover:text-[#0084d1] hover:bg-blue-50 rounded-lg transition-all"><Edit size={18} /></button>
                                        <button onClick={() => handleDelete(event.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredEvents.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-gray-500">No events found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
