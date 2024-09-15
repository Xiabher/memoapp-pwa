import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Memo } from '@/types';


interface MemoStore {
  memos: Memo[];
  addMemo: (text: string) => void;
  deleteMemo: (id: number) => void;
  toggleMemo: (id: number) => void;
  editMemo: (id: number, newText: string) => void;
}

const useMemoStore = create<MemoStore>()(
  persist(
    (set) => ({
      memos: [],
      addMemo: (text) => set((state) => ({ 
        memos: [{ id: Date.now(), text, completed: false }, ...state.memos ] 
      })),
      deleteMemo: (id) => set((state) => ({
        memos: state.memos.filter(memo => memo.id !== id)
      })),
      editMemo: (id, newText) => set((state) => ({
        memos: state.memos.map(memo => 
          memo.id === id ? { ...memo, text: newText } : memo
        )
      })),
      toggleMemo: (id) => set((state) => ({
        memos: state.memos.map(memo => 
          memo.id === id ? { ...memo, completed: !memo.completed } : memo
        )
      }))
    }),
    {
      name: 'memo-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useMemoStore