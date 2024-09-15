"use client"

import { useState, useRef, useEffect, FormEvent } from 'react'
import useMemoStore from './store/memoStore'

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
      {/* ... rest of your JSX ... */}
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
            {/* ... rest of your memo rendering logic ... */}
          </div>
        );
      })}
      {/* ... rest of your JSX ... */}
    </main>
  )
}