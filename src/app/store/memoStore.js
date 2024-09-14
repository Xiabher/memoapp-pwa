import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useMemoStore = create(
  persist(
    (set) => ({
      memos: [],
      addMemo: (text) => set((state) => ({ 
        memos: [...state.memos, { id: Date.now(), text, completed: false }] 
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
      getStorage: () => localStorage,
    }
  )
)

export default useMemoStore