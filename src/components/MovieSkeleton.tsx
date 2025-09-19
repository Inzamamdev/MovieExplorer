export default function MovieSkeleton() {
  return (
    <div className="w-48 rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="h-72 bg-gray-300 dark:bg-gray-700"></div>
      <div className="p-2 space-y-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  );
}
