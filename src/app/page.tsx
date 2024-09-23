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
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8">
      <div className="w-full min-w-full space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8">noteApp</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
         {/*
          <input 
            type="text" 
            value={newMemo}
            onChange={(e) => setNewMemo(e.target.value)}
            placeholder="Enter a memo" 
            className="w-full border p-2 rounded text-black dark:text-white dark:bg-gray-800"
            style={{ minHeight: '100px' }} // Adjust the value as needed
          />

          */}
<textarea 

  value={newMemo}
  onChange={(e) => setNewMemo(e.target.value)}
  placeholder="Enter a memo" 
  className=" text-lg font-semibold w-full h-32 border p-4 rounded text-black dark:text-blue-800 bg-yellow-800 dark:bg-yellow-200 dark:text-white resize"
  style={{ textAlign: 'left' }} // Align text to the right
/>

{/* className="w-full  border p-4 rounded text-black bg-yellow-200 dark:bg-yellow-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize overflow-hidden"*/}
  



          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full border p-2 rounded text-black dark:text-white dark:bg-gray-800"
          >
            <option value="all">All Categories</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="social">Social</option>
          </select>
          <button 
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          >
            Add Memo
          </button>
        </form>
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search memos" 
          className="w-full border p-2 rounded text-black dark:text-white dark:bg-gray-800"
        />
        <div className="space-y-2">
          {sortedFilteredMemos.map((memo: Memo) => {
            const firstLine = memo.text.split('\n')[0];
            const isEditing = editingId === memo.id;

            return (
              <div 
                key={memo.id} 
                className={`bg-yellow-100 dark:bg-yellow-700 p-3 rounded-md ${isEditing ? 'min-h-[50vh]' : 'cursor-pointer hover:bg-yellow-200 dark:hover:bg-yellow-600 transition-colors'}`}
                ref={isEditing ? editRef : undefined}
                onClick={() => !isEditing && handleEdit(memo.id, memo.text)}
              >
                {isEditing ? (
                  <div className="space-y-4">
                    <textarea 
                      value={newMemo}
                      onChange={(e) => setNewMemo(e.target.value)}
                      className={`w-full p-2 rounded text-black dark:text-white dark:bg-gray-800 min-h-[40vh] ${memo.completed ? 'line-through' : ''}`}
                    />
                    <div className="flex justify-between items-center">
                      <button 
                        onClick={() => handleSave(memo.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                      >
                        Save
                      </button>
                      <button 
                        onClick={() => handleToggle(memo.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        {memo.completed ? 'Mark Incomplete' : '(In)Complete'}
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
                    <p className={`text-gray-800 dark:text-gray-200 truncate flex-grow ${memo.completed ? 'line-through' : ''}`}>
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