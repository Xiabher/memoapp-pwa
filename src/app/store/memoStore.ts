import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


/* ineterfaces are like executive secretaries that has a contract with the boss. Their contact has specification and it is called interace it tells them the basic requirements but leaves on how to do their job to them. */
// Define the structure of a Memo object
// This is like a blueprint for what data each memo should contain
interface Memo {
  id: number;          // Unique identifier for each memo
  text: string;        // The main content of the memo
  completed: boolean;  // Whether the memo is marked as completed
  createdAt: string;   // Timestamp of when the memo was created
  updatedAt: string;   // Timestamp of the last update to the memo
  category?: string;   // Optional category for the memo
  tags?: string[];     // Optional array of tags for the memo
}

// Define the structure of our MemoStore
// This interface acts as a contract for what our store should be able to do
interface MemoStore {
  memos: Memo[];  // An array to store all our memos
  
  // Function signatures for CRUD operations and other utilities
  addMemo: (text: string, category?: string, tags?: string[]) => void;
  deleteMemo: (id: number) => void;
  toggleMemo: (id: number) => void;
  editMemo: (id: number, newText: string) => void;
  
  // Database-like operations
  searchMemos: (query: string) => Memo[];
  filterMemosByCategory: (category: string) => Memo[];
  sortMemosByDate: (ascending: boolean) => Memo[];
}

// Create our Zustand store with persistence
const useMemoStore = create<MemoStore>()(
  persist(
    (set, get) => ({
      memos: [],  // Initialize with an empty array of memos
      
      // Add a new memo to the store
      addMemo: (text, category, tags) => set((state) => ({ 
        memos: [{ 
          id: Date.now(),  // Use current timestamp as a unique ID
          text, 
          completed: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          category,
          tags
        }, ...state.memos ]  // Add new memo to the beginning of the array
      })),
      
      // Remove a memo from the store by its ID
      deleteMemo: (id) => set((state) => ({
        memos: state.memos.filter(memo => memo.id !== id)
      })),
      
      // Edit the text of a memo
      editMemo: (id, newText) => set((state) => ({
        memos: state.memos.map(memo => 
          memo.id === id ? { ...memo, text: newText, updatedAt: new Date().toISOString() } : memo
        )
      })),
      
      // Toggle the completed status of a memo
      toggleMemo: (id) => set((state) => ({
        memos: state.memos.map(memo => 
          memo.id === id ? { ...memo, completed: !memo.completed, updatedAt: new Date().toISOString() } : memo
        )
      })),
      
      // Search memos by text or tags
      searchMemos: (query) => {
        const { memos } = get();
        return memos.filter(memo => 
          memo.text.toLowerCase().includes(query.toLowerCase()) ||
          memo.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );
      },
      
      // Filter memos by category
      filterMemosByCategory: (category) => {
        const { memos } = get();
        return memos.filter(memo => memo.category === category);
      },
      
      // Sort memos by date
      sortMemosByDate: (ascending = true) => {
        const { memos } = get();
        return [...memos].sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return ascending ? dateA - dateB : dateB - dateA;
        });
      }
    }),
    {
      name: 'memo-storage',  // Name for the storage in localStorage
      storage: createJSONStorage(() => localStorage),  // Use localStorage for persistence
    }
  )
)

export default useMemoStore