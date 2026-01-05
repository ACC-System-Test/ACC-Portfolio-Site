import { AppData } from './types';

const STORAGE_KEY = 'acc_portal_data_v1';

export const storage = {
    save: (data: AppData) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.error('Failed to save data', e);
        }
    },

    load: (): AppData | null => {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Failed to load data', e);
            return null;
        }
    },

    clear: () => {
        localStorage.removeItem(STORAGE_KEY);
    }
};
