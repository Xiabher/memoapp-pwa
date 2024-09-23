"use client"

import { Memo } from 'src/types'
import MemoItem from './MemoItem'

interface MemoListProps {
  memos: Memo[]
}

export default function MemoList({ memos }: MemoListProps) {
  const sortedMemos = [...memos].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return (
    <div className="space-y-2">
      {sortedMemos.map((memo) => (
        <MemoItem key={memo.id} memo={memo} />
      ))}
    </div>
  )
}