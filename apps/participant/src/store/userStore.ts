import { create } from 'zustand';

interface UserState {
  user: any;
  registration: any;
  ticket: any;
  team: any;
  loading: boolean;
  fetchDashboardData: () => Promise<void>;
  updateProfileOptimistic: (data: any) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  registration: null,
  ticket: null,
  team: null,
  loading: true,
  fetchDashboardData: async () => {
    // Activating global loading spinner
    set({ loading: true });
    
    // Simulate API resolving 
    setTimeout(() => {
      set({
        user: { name: 'Alex Developer', email: 'dev@hackflow.com', college: 'Global Tech Institute', skills: ['React', 'Node.js', 'UI/UX'], avatar: null },
        registration: { paymentStatus: 'success' }, // Enum tracking bindings
        ticket: { id: 'HCK-2026-XQZ4' },
        team: { name: 'Alpha Coders', inviteCode: 'XYZ123', members: [{ name: 'Alex Developer', avatar: null }, { name: 'Jane Hacker', avatar: null }] },
        loading: false
      });
    }, 1200);
  },
  updateProfileOptimistic: (data) => set((state) => ({ user: { ...state.user, ...data } }))
}));
