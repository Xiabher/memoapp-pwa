"use client"

import { useState, useRef, useEffect, FormEvent } from 'react'
import useMemoStore from '@/app/store/memoStore'
import { Memo } from '@/types'

export default function Home() {
  const [isClient, setIsClient] = useState(false)
  const [newMemo, setNewMemo] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const { memos, addMemo, deleteMemo, editMemo } = useMemoStore()
  const editRef = useRef<HTMLTextAreaElement>(null)

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

  useEffect(() => {
    if (editingId && editRef.current) {
      editRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [editingId])

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
          {memos.map((memo: Memo) => {
            const firstLine = memo.text.split('\n')[0];
            const isEditing = editingId === memo.id;

            return (
              <div 
                key={memo.id} 
                className={`bg-yellow-100 dark:bg-yellow-700 p-3 rounded-md ${isEditing ? 'min-h-[50vh]' : 'cursor-pointer hover:bg-yellow-200 dark:hover:bg-yellow-600 transition-colors'}`}
                ref={isEditing ? editRef : null}
                onClick={() => !isEditing && handleEdit(memo.id, memo.text)}
              >
                {isEditing ? (
                  <div className="space-y-4">
                    <textarea 
                      value={newMemo}
                      onChange={(e) => setNewMemo(e.target.value)}
                      className="w-full p-2 rounded text-black dark:text-white dark:bg-gray-800 min-h-[40vh]"
                    />
                    <div className="flex justify-between items-center">
                      <button 
                        onClick={() => handleSave(memo.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                      >
                        Save
                      </button>
                      <button 
                        onClick={() => handleDelete(memo.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <p className="text-gray-800 dark:text-gray-200 truncate flex-grow">
                      {firstLine}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  )
}