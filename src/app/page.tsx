"use client"

import { useState, FormEvent, useEffect } from 'react'
import useMemoStore from '@/app/store/memoStore'

export default function Home() {
  const [isClient, setIsClient] = useState(false)
  const [newMemo, setNewMemo] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const { memos, addMemo, deleteMemo, editMemo } = useMemoStore()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newMemo.trim()) return
    addMemo(newMemo)
    setNewMemo('')
  }

  const handleEdit = (id: number, text: string) => {
    setEditingId(id)
    setNewMemo(text)
  }

  const handleSave = (id: number) => {
    editMemo(id, newMemo)
    setEditingId(null)
    setNewMemo('')
  }

  const handleDelete = (id: number) => {
    deleteMemo(id)
    setEditingId(null)
    setNewMemo('')
  }

  if (!isClient) {
    return null // or a loading indicator
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
              className="bg-yellow-100 dark:bg-yellow-700 p-3 rounded-md"
            >
              {editingId === memo.id ? (
                <div className="space-y-2">
                  <textarea 
                    value={newMemo}
                    onChange={(e) => setNewMemo(e.target.value)}
                    className="w-full p-2 rounded text-black dark:text-white dark:bg-gray-800"
                  />
                  <div className="flex justify-between">
                    <button 
                      onClick={() => handleSave(memo.id)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                    <button 
                      onClick={() => handleDelete(memo.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <p className="text-gray-800 dark:text-gray-200">{memo.text}</p>
                  <button 
                    onClick={() => handleEdit(memo.id, memo.text)}
                    className="text-blue-500"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}