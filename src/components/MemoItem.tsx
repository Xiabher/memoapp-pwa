"use client"

import { useState, useRef, useEffect } from 'react'
import useMemoStore from '@/app/store/memoStore'
import { Memo } from 'src/types'

interface MemoItemProps {
  memo: Memo
}

export default function MemoItem({ memo }: MemoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(memo.text)
  const { editMemo, deleteMemo, toggleMemo } = useMemoStore()
  const editRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isEditing && editRef.current) {
      editRef.current.focus()
    }
  }, [isEditing])

  const handleSave = () => {
    editMemo(memo.id, editedText)
    setIsEditing(false)
  }

  const firstLine = memo.text.split('\n')[0]

  return (
    <div 
      className={`bg-white p-3 rounded-md shadow ${isEditing ? 'min-h-[25vh]' : 'cursor-pointer hover:bg-gray-50 transition-colors'}`}
      onClick={() => !isEditing && setIsEditing(true)}
    >
      {isEditing ? (
        <div className="space-y-4">
          <textarea 
            ref={editRef}
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className={`w-full p-2 rounded text-gray-800 bg-white min-h-[40vh] ${memo.completed ? 'line-through' : ''}`}
          />
          <div className="flex justify-between items-center">
            <button 
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button 
              onClick={() => toggleMemo(memo.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {memo.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
            <button 
              onClick={() => deleteMemo(memo.id)}
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
  )
}