import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, updateUser } from '../services/api';

const Profile = ({ user, setUser }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const data = await getCurrentUser();
            const userData = data.user || data;
            setFormData({
                username: userData.username || '',
                email: userData.email || ''
            });
            if (setUser) setUser(userData);
        } catch (error) {
            console.error('Error loading profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        
        try {
            const updatedUser = await updateUser(formData);
            localStorage.setItem('storedUser', JSON.stringify(updatedUser.user || updatedUser));
            if (setUser) setUser(updatedUser.user || updatedUser);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setEditing(false);
        } catch (error) {
            setMessage({ type: 'error', text: error.message || 'Failed to update profile' });
        }
    };

    const getLevelTitle = (level) => {
        const titles = {
            1: '🥚 Rookie',
            2: '🌱 Beginner',
            3: '📚 Learner',
            4: '⚡ Striver',
            5: '🔥 Achiever',
            6: '⭐ Expert',
            7: '🏆 Master',
            8: '👑 Elite',
            9: '💎 Legend',
            10: '🌟 Mythical'
        };
        return titles[level] || `Level ${level}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <div className="bg-purple-600 text-white">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">My Profile</h1>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                        >
                            ← Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-3xl">
                {/* Message Alert */}
                {message.text && (
                    <div className={`mb-6 p-4 rounded-lg ${
                        message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                        {message.text}
                    </div>
                )}

                {/* Profile Card */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Cover Image / Banner */}
                    <div className="h-32 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                    
                    {/* Avatar Section */}
                    <div className="relative px-6 pb-6">
                        <div className="absolute -top-12 left-6">
                            <div className="w-24 h-24 rounded-full bg-white p-1 shadow-lg">
                                <div className="w-full h-full rounded-full bg-purple-500 flex items-center justify-center text-4xl">
                                    {user?.username?.charAt(0).toUpperCase() || '👤'}
                                </div>
                            </div>
                        </div>
                        
                        <div className="pt-16 flex justify-end">
                            {!editing && (
                                <button
                                    onClick={() => setEditing(true)}
                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                                >
                                    ✏️ Edit Profile
                                </button>
                            )}
                        </div>

                        {/* User Info */}
                        {!editing ? (
                            <div className="mt-4">
                                <h2 className="text-2xl font-bold text-gray-800">{user?.username}</h2>
                                <p className="text-gray-500">{user?.email}</p>
                                
                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                                        <div className="text-2xl font-bold text-purple-600">{user?.points || 0}</div>
                                        <div className="text-xs text-gray-500">Total Points</div>
                                    </div>
                                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                                        <div className="text-2xl font-bold text-purple-600">{user?.level || 1}</div>
                                        <div className="text-xs text-gray-500">Level</div>
                                    </div>
                                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                                        <div className="text-2xl font-bold text-purple-600">{user?.streak_days || 0}</div>
                                        <div className="text-xs text-gray-500">Day Streak</div>
                                    </div>
                                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                                        <div className="text-2xl font-bold text-purple-600">
                                            {Math.floor((user?.points || 0) / 100)}
                                        </div>
                                        <div className="text-xs text-gray-500">Tasks Completed</div>
                                    </div>
                                </div>

                                {/* Level Progress */}
                                <div className="mt-6">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">Level Progress</span>
                                        <span className="text-gray-600">{getLevelTitle(user?.level)}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-500"
                                            style={{ width: `${((user?.points % 100) / 100) * 100}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {100 - (user?.points % 100)} points to next level
                                    </p>
                                </div>

                                {/* Join Date */}
                                <div className="mt-6 pt-4 border-t">
                                    <p className="text-sm text-gray-500">
                                        📅 Joined {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Recently'}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            // Edit Form
                            <form onSubmit={handleUpdate} className="mt-4 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditing(false);
                                            loadUserData();
                                        }}
                                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                {/* Stats Card */}
                <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">📊 Activity Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-600">Total Points Earned</span>
                            <span className="font-bold text-purple-600">{user?.points || 0}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-600">Current Level</span>
                            <span className="font-bold text-purple-600">{user?.level || 1}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-600">Longest Streak</span>
                            <span className="font-bold text-purple-600">{user?.streak_days || 0} days</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-600">Points to Next Level</span>
                            <span className="font-bold text-purple-600">{100 - ((user?.points || 0) % 100)}</span>
                        </div>
                    </div>
                </div>

                {/* Member Since Card */}
                <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">🏆 Member Info</h3>
                    <div className="space-y-2">
                        <p className="text-gray-600">
                            <span className="font-medium">Member since:</span>{' '}
                            {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            }) : 'Recent'}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-medium">Account status:</span>{' '}
                            <span className="text-green-600">✓ Active</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;