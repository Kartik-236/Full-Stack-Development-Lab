const { useState } = React;

// --- Mock Data ---
// In a real app, this would come from an API
const initialUserData = {
  name: "Kartik Kaushik",
  avatarUrl: "https://www.shutterstock.com/image-vector/cimahi-indonesiajanuary-30-2024-serious-260nw-2420117571.jpg",
  bio: "Frontend Developer & Cybersecurity Enthusiast.",
  stats: {
    posts: 142,
    followers: "200", // This will be updated by our function
    following: 350,
  },
  activities: [
    {
      id: 1,
      icon: "📷",
      text: 'Posted a new photo album: "Diwali Vibes"',
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      icon: "💬",
      text: 'Commented on Amar’s post: "This looks amazing!"',
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      icon: "✏️",
      text: 'Published a new article: "The Future of CSS Grids"',
      timestamp: "1 day ago",
    },
    {
      id: 4,
      icon: "❤️",
      text: "Liked a post by Tenz about component design.",
      timestamp: "2 days ago",
    },
  ],
};

// --- Components ---

// CHANGED: ProfileCard now accepts `onFollow` and `isFollowing` props
function ProfileCard({ user, onFollow, isFollowing }) {
  return (
    <div className="w-full md:w-1/3 bg-white p-6 rounded-3xl shadow-lg flex flex-col items-center text-center">
      <img
        src={user.avatarUrl}
        alt={`${user.name}'s avatar`}
        className="w-32 h-32 rounded-full border-4 border-purple-400 shadow-md"
      />
      <h1 className="text-2xl font-bold mt-4">{user.name}</h1>
      <p className="text-gray-500 mt-2">{user.bio}</p>
      <div className="flex justify-around w-full mt-6 border-t pt-4">
        <div className="text-center">
          <p className="font-bold text-xl">{user.stats.posts}</p>
          <p className="text-gray-500 text-sm">Posts</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-xl">{user.stats.followers}</p>
          <p className="text-gray-500 text-sm">Followers</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-xl">{user.stats.following}</p>
          <p className="text-gray-500 text-sm">Following</p>
        </div>
      </div>
      {/* CHANGED: This button is now interactive and dynamic */}
      <button 
        onClick={onFollow}
        disabled={isFollowing}
        className={`mt-6 w-full py-3 rounded-xl text-white font-semibold hover:scale-105 transition ${
          isFollowing
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-gradient-to-r from-purple-500 to-indigo-600'
        }`}
      >
        {isFollowing ? 'Following ✅' : 'Follow'}
      </button>
    </div>
  );
}

// Component for a single activity item in the feed
function ActivityItem({ activity }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl transition hover:bg-slate-50">
      <div className="text-2xl bg-slate-200 p-2 rounded-full">{activity.icon}</div>
      <div className="flex-1">
        <p className="font-medium text-gray-800">{activity.text}</p>
        <p className="text-sm text-gray-500 mt-1">{activity.timestamp}</p>
      </div>
    </div>
  );
}

// Component for the activity feed
function ActivityFeed({ activities }) {
  return (
    <div className="w-full md:w-2/3 bg-white p-6 rounded-3xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [user, setUser] = useState(initialUserData);
  // NEW: State to track if the user has followed
  const [isFollowing, setIsFollowing] = useState(false);

  // NEW: Function to handle the follow button click
  function handleFollow() {
    if (isFollowing) return; // Prevent increasing the count more than once

    // Update the user state by increasing the follower count
    setUser(currentUser => {
      const currentFollowers = parseInt(currentUser.stats.followers, 10);
      return {
        ...currentUser,
        stats: {
          ...currentUser.stats,
          followers: (currentFollowers + 1).toString(),
        }
      };
    });

    // Set the following status to true
    setIsFollowing(true);
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">User Dashboard</h1>
          <p className="text-gray-500">Welcome back, {user.name}!</p>
        </header>

        <main className="flex flex-col md:flex-row gap-8">
          {/* CHANGED: Pass the new function and state down to the ProfileCard */}
          <ProfileCard 
            user={user} 
            onFollow={handleFollow} 
            isFollowing={isFollowing} 
          />
          <ActivityFeed activities={user.activities} />
        </main>
      </div>
    </div>
  );
}

// --- Render the App to the DOM ---
ReactDOM.createRoot(document.getElementById("root")).render(<App />);