import { FiHeart, FiMessageSquare, FiShare2, FiBookmark, FiMoreHorizontal } from 'react-icons/fi';

const Feed = () => {
  const posts = [
    {
      id: 1,
      username: 'sarah_designs',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      time: '2h ago',
      content: 'Just launched our new product line! Check out the amazing features we built for designers.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
      likes: 124,
      comments: 23,
      shares: 12
    },
    {
      id: 2,
      username: 'tech_innovator',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      time: '5h ago',
      content: 'The future of AI in creative tools is brighter than ever. Here are my thoughts on where we\'re heading next...',
      image: 'https://images.unsplash.com/photo-1677442135136-760c813a743e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
      likes: 89,
      comments: 15,
      shares: 7
    },
    {
      id: 3,
      username: 'creative_minds',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      time: '1d ago',
      content: 'Collaboration is key to innovation. Our team just wrapped up an amazing project with some incredible partners!',
      image: 'https://images.unsplash.com/photo-1682686580391-615b3e706739?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
      likes: 215,
      comments: 42,
      shares: 31
    }
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-base-100 bg-opacity-90 backdrop-blur-sm border-b border-base-200">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Pitch</h1>
          <div className="flex items-center space-x-4">
            <button className="btn btn-ghost btn-sm">Home</button>
            <button className="btn btn-ghost btn-sm">Explore</button>
            <button className="btn btn-ghost btn-sm">Notifications</button>
            <div className="avatar">
              <div className="w-8 rounded-full">
                <img src="https://randomuser.me/api/portraits/women/33.jpg" alt="User avatar" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Create Post */}
        <div className="card bg-base-100 shadow-sm mb-6">
          <div className="card-body">
            <div className="flex items-start space-x-3">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src="https://randomuser.me/api/portraits/women/33.jpg" alt="User avatar" />
                </div>
              </div>
              <input
                type="text"
                placeholder="What's on your mind?"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="flex justify-between mt-3">
              <div className="flex space-x-2">
                <button className="btn btn-ghost btn-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Photo
                </button>
                <button className="btn btn-ghost btn-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Video
                </button>
              </div>
              <button className="btn btn-primary btn-sm">Post</button>
            </div>
          </div>
        </div>

        {/* Feed */}
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="card-body">
                {/* Post Header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img src={post.avatar} alt={post.username} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold">{post.username}</h3>
                      <p className="text-sm text-gray-500">{post.time}</p>
                    </div>
                  </div>
                  <button className="btn btn-ghost btn-sm btn-square">
                    <FiMoreHorizontal className="text-gray-500" />
                  </button>
                </div>

                {/* Post Content */}
                <div className="mt-4">
                  <p className="text-gray-800">{post.content}</p>
                  {post.image && (
                    <div className="mt-4 rounded-lg overflow-hidden">
                      <img
                        src={post.image}
                        alt="Post content"
                        className="w-full h-auto object-cover rounded-lg transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  )}
                </div>

                {/* Post Stats */}
                <div className="flex justify-between mt-4 text-sm text-gray-500">
                  <span>{post.likes} likes</span>
                  <span>{post.comments} comments • {post.shares} shares</span>
                </div>

                {/* Post Actions */}
                <div className="flex justify-between mt-3 border-t border-base-200 pt-3">
                  <button className="btn btn-ghost btn-sm gap-2">
                    <FiHeart className="text-lg" />
                    Like
                  </button>
                  <button className="btn btn-ghost btn-sm gap-2">
                    <FiMessageSquare className="text-lg" />
                    Comment
                  </button>
                  <button className="btn btn-ghost btn-sm gap-2">
                    <FiShare2 className="text-lg" />
                    Share
                  </button>
                  <button className="btn btn-ghost btn-sm gap-2">
                    <FiBookmark className="text-lg" />
                    Save
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Sidebar (would be implemented in a layout component) */}
    </div>
  );
};

export default Feed