import { useState, useEffect } from 'react';
import { getShopItems, purchaseItem } from '../services/api';

const ShopModal = ({ isOpen, onClose, userPoints, onPurchaseSuccess }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen) {
            getShopItems()
                .then(data => {
                    setItems(data);
                    setLoading(false);
                })
                .catch(err => console.error("Failed to load shop", err));
        }
    }, [isOpen]);

    const handlePurchase = async (itemId) => {
        try {
            const result = await purchaseItem(itemId);
            // Refresh parent state
            onPurchaseSuccess(result.user);
            alert("Item added to inventory!");
            onClose();
        } catch (error) {
            alert(error.message || "Failed to purchase item");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-[500px] max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-purple-600">Pet Shop 🛒</h2>
                    <button onClick={onClose} className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-purple-700 hover:shadow-md transition"> Close ✕ </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {loading ? (
                        <p className="col-span-2 text-center py-10 text-gray-500">Loading shop items...</p>
                    ) : (
                        items.map(item => (
                            <div key={item.id} className="border p-4 rounded-lg text-center hover:shadow-md transition">
                                <div className="text-4xl mb-2">{item.image_url || '📦'}</div>
                                <h3 className="font-bold">{item.name}</h3>
                                <p className="text-xs text-gray-500 mb-2">{item.description}</p>
                                <button
                                    onClick={() => handlePurchase(item.id)}
                                    disabled={userPoints < item.cost_points}
                                    className="w-full bg-purple-500 text-white rounded py-1 disabled:bg-gray-300"
                                >
                                    💰 {item.cost_points} Pts
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShopModal;