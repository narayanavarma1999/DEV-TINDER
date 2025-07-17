const ShimmerLoading = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-20 animate-pulse">
      {/* User Profile Shimmer */}
      <div className="flex items-center space-x-4">
        <div className="rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 h-12 w-12"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-1/2"></div>
        </div>
      </div>

      {/* Card Shimmer */}
      <div className="card bg-base-100 shadow-xl overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 relative overflow-hidden">
          {/* Shimmer effect - now using Tailwind */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.3)_50%,rgba(255,255,255,0)_100%)] animate-[shimmer_2s_infinite]"></div>
        </div>

        <div className="card-body">
          <div className="space-y-3">
            <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-4/5"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4"></div>

            <div className="flex flex-wrap gap-2 pt-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full w-20"></div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
            <div className="flex space-x-4">
              <div className="h-8 w-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full"></div>
              <div className="h-8 w-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full"></div>
              <div className="h-8 w-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full"></div>
            </div>
            <div className="h-8 w-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Additional shimmer items */}
      {[...Array(2)].map((_, index) => (
        <div key={index} className="card bg-base-100 shadow-xl overflow-hidden">
          <div className="card-body space-y-4">
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 h-10 w-10"></div>
              <div className="space-y-2 flex-1">
                <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-1/2"></div>
                <div className="h-2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-1/3"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-5/6"></div>
            </div>
            <div className="h-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg"></div>
          </div>
        </div>
      ))}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
          animation: 'shimmer 2s infinite'
        }}
      ></div>
    </div>


  );
};

export default ShimmerLoading;