import { create } from 'zustand'

const useMemoStore = create((set) => ({
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
  }))
}))

export default useMemoStore