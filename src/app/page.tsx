export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8">MemoApp</h1>
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Enter a memo" 
            className="w-full border p-2 rounded text-black dark:text-white dark:bg-gray-800"
          />
          <button 
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          >
            Add Memo
          </button>
   
          <div className="bg-yellow-100 dark:bg-yellow-700 shadow-md rounded-lg p-4 mb-4 cursor-pointer transition-all duration-300 hover:shadow-lg">
  <p className="text-gray-800 dark:text-gray-200 line-clamp-3 hover:line-clamp-none">
    Your memo text goes here. This could be a longer note that gets truncated initially but expands on hover or click.
  </p>
</div>




        </div>
      </div>
    </main>
  );
}