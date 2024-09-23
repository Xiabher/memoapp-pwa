"use client"

import { useState, useRef, useEffect, FormEvent } from 'react'
import useMemoStore from '@/app/store/memoStore'
import { Memo } from 'src/types'

export default function Home() {
  const [isClient, setIsClient] = useState(false)
  const [newMemo, setNewMemo] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const { memos, addMemo, deleteMemo, editMemo, toggleMemo, searchMemos, filterMemosByCategory } = useMemoStore()
  const editRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newMemo.trim()) return
    addMemo(newMemo, filterCategory)
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

  const handleToggle = (id: number) => {
    toggleMemo(id)
  }

  useEffect(() => {
    if (editingId && editRef.current) {
      editRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [editingId])

  const filteredMemos = searchQuery 
    ? searchMemos(searchQuery) 
    : filterCategory !== 'all' 
      ? filterMemosByCategory(filterCategory) 
      : memos

  const sortedFilteredMemos = [...filteredMemos].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  if (!isClient) {
    return null // or a loading indicator
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 bg-yellow-100">
      <div className="w-full max-w-4xl space-y-8">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">noteApp</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea 
            value={newMemo}
            onChange={(e) => setNewMemo(e.target.value)}
            placeholder="Enter a memo" 
            className="text-lg font-semibold w-full h-64 border p-4 rounded text-gray-800 bg-white resize-none"
            style={{ minHeight: '33vh' }}
          />
          <button 
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-800 transition-colors"
          >
            Add Memo
          </button>
        </form>
        <div className="flex justify-between items-center">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-1/3 border p-2 rounded text-gray-800 bg-white"
          >
            <option value="all">All Categories</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="social">Social</option>
          </select>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search memos" 
            className="w-1/3 border p-2 rounded text-gray-800 bg-white"
          />
        </div>
        <div className="space-y-2">
          {sortedFilteredMemos.map((memo: Memo) => {
            const firstLine = memo.text.split('\n')[0];
            const isEditing = editingId === memo.id;

            return (
              <div 
                key={memo.id} 
                className={`bg-white p-3 rounded-md shadow ${isEditing ? 'min-h-[50vh]' : 'cursor-pointer hover:bg-gray-50 transition-colors'}`}
                ref={isEditing ? editRef : undefined}
                onClick={() => !isEditing && handleEdit(memo.id, memo.text)}
              >
                {isEditing ? (
                  <div className="space-y-4">
                    <textarea 
                      value={newMemo}
                      onChange={(e) => setNewMemo(e.target.value)}
                      className={`w-full p-2 rounded text-gray-800 bg-white min-h-[40vh] ${memo.completed ? 'line-through' : ''}`}
                    />
                    <div className="flex justify-between items-center">
                      <button 
                        onClick={() => handleSave(memo.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button 
                        onClick={() => handleToggle(memo.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        {memo.completed ? 'Mark Incomplete' : '(In)Complete'}
                      </button>
                      <button 
                        onClick={() => handleDelete(memo.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <p className={`text-gray-800 truncate flex-grow ${memo.completed ? 'line-through' : ''}`}>
                      {firstLine}
                    </p>
                    <span className="text-sm text-gray-500 ml-2">{memo.category}</span>
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