"use client"

interface SearchAndFilterProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  filterCategory: string
  setFilterCategory: (category: string) => void
}

export default function SearchAndFilter({
  searchQuery,
  setSearchQuery,
  filterCategory,
  setFilterCategory
}: SearchAndFilterProps) {
  return (
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
  )
}