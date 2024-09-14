"use client"

import { useState, FormEvent, useEffect } from 'react'
import useMemoStore from '@/app/store/memoStore'


export default function Home() {
  const [newMemo, setNewMemo] = useState('')
  const { memos, addMemo, deleteMemo, toggleMemo } = useMemoStore()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newMemo.trim()) return
    addMemo(newMemo)
    setNewMemo('')
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8">
      <div className="w-full max-w-md space-y-8">
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
        <div className="space-y-2">
          {memos.map((memo) => (
            <div 
              key={memo.id} 
              className="flex justify-between items-center bg-yellow-100 dark:bg-yellow-700 p-3 rounded-md"
            >
              <p className={`text-gray-800 dark:text-gray-200 ${memo.completed ? 'line-through' : ''}`}>
                {memo.text}
              </p>
              <div>
                <button 
                  onClick={() => toggleMemo(memo.id)}
                  className="text-blue-500 mr-2"
                >
                  Toggle
                </button>
                <button 
                  onClick={() => deleteMemo(memo.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}