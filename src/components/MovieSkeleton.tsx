export default function MovieSkeleton() {
  return (
    <div
      className="
        w-full sm:w-[45%] md:w-48
        rounded-lg shadow-md overflow-hidden animate-pulse
        dark:shadow-gray-800
      "
    >
      {/* Poster placeholder */}
      <div className="w-full aspect-[2/3] bg-gray-300 dark:bg-gray-700"></div>

      {/* Text placeholders */}
      <div className="p-2 space-y-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  );
}
