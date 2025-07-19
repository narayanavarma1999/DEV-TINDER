import { HeartIcon } from '@heroicons/react/24/outline';

const ShimmerLoading = () => {
  return (

    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          <HeartIcon className="absolute inset-0 w-12 h-12 mx-auto my-6 text-pink-500 animate-pulse" />
        </div>
        <p className="text-2xl font-light text-white animate-pulse">Finding perfect matches...</p>
      </div>
    </div>

  );
};

export default ShimmerLoading;