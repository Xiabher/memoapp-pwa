import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Memo {
  id: number;
  text: string;
  completed: boolean;
}

interface MemoStore {
  memos: Memo[];
  addMemo: (text: string) => void;
  deleteMemo: (id: number) => void;
  toggleMemo: (id: number) => void;
}

const useMemoStore = create<MemoStore>()(
  persist(
    (set) => ({
      memos: [],
      addMemo: (text) => set((state) => ({ 
        memos: [...state.memos, { id: Date.now(), text, completed: false }] 
      })),
      deleteMemo: (id) => set((state) => ({
        memos: state.memos.filter(memo => memo.id !== id)
      })),
      toggleMemo: (id) => set((state) => ({
        memos: state.memos.map(memo => 
          memo.id === id ? { ...memo, completed: !memo.completed } : memo
        )
      })),
    }),
    {
      name: 'memo-storage',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
)

export default useMemoStore