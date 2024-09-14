"use client"

import { useState } from 'react'
import useMemoStore from '@/app/store/memoStore'

export default function Home() {
  const [newMemo, setNewMemo] = useState('')
  const { memos, addMemo } = useMemoStore()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newMemo.trim()) return
    addMemo(newMemo)
    setNewMemo('')
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8">MemoApp</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            value={newMemo}
            onChange={(e) => setNewMemo(e.target.value)}
            placeholder="Enter a memo" 
            className="w-full border p-2 rounded text-black dark:text-white dark:bg-gray-800"
          />
          <button 
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          >
            Add Memo
          </button>
        </form>

        <div className="space-y-2 max-w-md w-full">
  {memos.map((memo) => {
    const firstLine = memo.text.split('\n')[0];
    return (
      <div 
        key={memo.id} 
        className="bg-yellow-100 dark:bg-yellow-700 p-3 rounded-md flex justify-between items-center cursor-pointer hover:bg-yellow-200 dark:hover:bg-yellow-600 transition-colors"
      >
        <p className="text-gray-800 dark:text-gray-200 truncate">
          {firstLine}
        </p>
        <span className="text-gray-500 dark:text-gray-400 text-sm">
          {memo.text.split('\n').length > 1 ? '...' : ''}
        </span>
      </div>
    );
  })}
</div>




      </div>
    </main>
  )
}