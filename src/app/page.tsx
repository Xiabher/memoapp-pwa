"use client"

import { useState, useEffect } from 'react'
import useMemoStore from '@/app/store/memoStore'
import MemoForm from '@/components/MemoForm'
import MemoList from '@/components/MemoList'
import SearchAndFilter from '@/components/SearchAndFilter'

export default function Home() {
  const [isClient, setIsClient] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const { memos, searchMemos, filterMemosByCategory } = useMemoStore()

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null // or a loading indicator
  }

  const filteredMemos = searchQuery 
    ? searchMemos(searchQuery) 
    : filterCategory !== 'all' 
      ? filterMemosByCategory(filterCategory) 
      : memos

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 bg-yellow-100">
      <div className="w-full max-w-4xl space-y-8">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">Adam Isak</h1>
        <MemoForm />
        <SearchAndFilter 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
        />
        <MemoList memos={filteredMemos} />
      </div>
    </main>
  )
}