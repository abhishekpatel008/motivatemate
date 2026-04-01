import { Link } from 'react-router-dom';

const Header = ({ user, onShopClick, onAchievementsClick, onLogout }) => {
    return (
        <nav className="bg-purple-600 text-white p-4 flex justify-between items-center shadow-lg">
            <h1 className="text-xl font-bold">MotivateMate</h1>
            <div className="flex gap-4 items-center">
                <span>⭐ Pts: {user?.points || 0}</span>
                <span>🎮 Lvl: {user?.level || 1}</span>
                <span>🔥 Streak: {user?.streak_days || 0}</span>
                <button
                    onClick={onAchievementsClick}
                    className="bg-white -400 text-purple-600 px-3 py-1 rounded-lg font-bold hover:bg-green-300 transition"
                >
                    🏆 Achievements
                </button>
                <button
                    onClick={onShopClick}
                    className="bg-yellow-400 text-purple-900 px-3 py-1 rounded-lg font-bold hover:bg-yellow-300 transition"
                >
                    🛒 Shop
                </button>
                <Link
                    to="/profile"
                    className="bg-green-400 text-purple-900 px-3 py-1 rounded-lg font-bold hover:bg-blue-300 transition"
                >
                    👤 Profile
                </Link>
                <button onClick={onLogout} className="text-sm underline">
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Header;