
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Product, AppConfig } from '../types';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const { products, config, loading, updateConfig, addProduct, updateProduct, deleteProduct } = useAppContext();
  
  const [activeTab, setActiveTab] = useState<'products' | 'settings'>('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [settingsFormData, setSettingsFormData] = useState<AppConfig>(config);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') !== 'true') {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    setSettingsFormData(config);
  }, [config]);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    navigate('/');
  };

  const initialFormState: Product = {
    id: '',
    title: '',
    price: 0,
    rating: 4.5,
    reviewCount: 0,
    imageUrl: '',
    category: '',
    description: '',
    brand: '',
    features: [],
    isPrime: true,
    stockStatus: 'In Stock',
    buyNowUrl: ''
  };

  const [formData, setFormData] = useState<Product>(initialFormState);

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    if (isAdding) {
      await addProduct({ ...formData, id: Date.now().toString() });
    } else {
      await updateProduct(formData);
    }
    setIsSaving(false);
    setEditingProduct(null);
    setIsAdding(false);
    setFormData(initialFormState);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateConfig(settingsFormData);
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          <p className="text-gray-600 font-medium">Loading database content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="amazon-blue-dark p-6 flex justify-between items-center text-white">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Admin Control Panel</h1>
            <span className="text-xs text-gray-400">Connected to Supabase</span>
          </div>
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-bold transition-colors">Logout</button>
        </div>

        <div className="flex border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-8 py-4 font-bold text-sm transition-all ${activeTab === 'products' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Manage Products
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`px-8 py-4 font-bold text-sm transition-all ${activeTab === 'settings' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Global Settings
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Products List ({products.length})</h2>
                <button 
                  onClick={() => { setIsAdding(true); setEditingProduct(null); setFormData(initialFormState); }}
                  className="amazon-yellow amazon-yellow-hover px-4 py-2 rounded font-bold text-sm shadow-sm transition-all"
                >
                  <i className="fas fa-plus mr-2"></i>
                  Add New Product
                </button>
              </div>

              {(isAdding || editingProduct) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl scale-in-center">
                    <h3 className="text-xl font-bold mb-4">{isAdding ? 'Add New Product' : 'Edit Product'}</h3>
                    <form onSubmit={handleSubmitProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Product Title</label>
                        <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border rounded p-2 text-sm focus:ring-1 focus:ring-orange-500" required />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Price ($)</label>
                        <input type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} className="w-full border rounded p-2 text-sm focus:ring-1 focus:ring-orange-500" required />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Category</label>
                        <input value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border rounded p-2 text-sm focus:ring-1 focus:ring-orange-500" required />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Image URL (Copy Address Here)</label>
                        <input value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full border rounded p-2 text-sm focus:ring-1 focus:ring-orange-500" placeholder="Paste URL from Google Images etc." required />
                        {formData.imageUrl && <img src={formData.imageUrl} alt="preview" className="h-20 mt-2 object-contain border p-1" />}
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Brand</label>
                        <input value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} className="w-full border rounded p-2 text-sm focus:ring-1 focus:ring-orange-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Stock Status</label>
                        <input value={formData.stockStatus} onChange={e => setFormData({...formData, stockStatus: e.target.value})} className="w-full border rounded p-2 text-sm focus:ring-1 focus:ring-orange-500" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Custom Buy Now URL (Optional)</label>
                        <input value={formData.buyNowUrl} onChange={e => setFormData({...formData, buyNowUrl: e.target.value})} className="w-full border rounded p-2 text-sm focus:ring-1 focus:ring-orange-500" placeholder="Overrides global Buy Now URL" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Description</label>
                        <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border rounded p-2 text-sm h-24 focus:ring-1 focus:ring-orange-500" />
                      </div>
                      <div className="flex gap-4 items-center">
                         <label className="flex items-center gap-2 text-sm font-bold cursor-pointer">
                           <input type="checkbox" checked={formData.isPrime} onChange={e => setFormData({...formData, isPrime: e.target.checked})} />
                           Prime Member Product
                         </label>
                      </div>
                      <div className="md:col-span-2 flex justify-end gap-2 mt-4">
                        <button type="button" onClick={() => { setIsAdding(false); setEditingProduct(null); }} className="px-6 py-2 border rounded text-sm font-bold hover:bg-gray-50">Cancel</button>
                        <button type="submit" disabled={isSaving} className="amazon-yellow amazon-yellow-hover px-6 py-2 rounded text-sm font-bold disabled:opacity-50">
                          {isSaving ? 'Saving...' : 'Save Product'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 text-xs uppercase font-bold">
                      <th className="p-4 border-b">Img</th>
                      <th className="p-4 border-b">Title</th>
                      <th className="p-4 border-b">Price</th>
                      <th className="p-4 border-b">Category</th>
                      <th className="p-4 border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {products.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-12 text-center text-gray-500 italic">
                          No products found in the database.
                        </td>
                      </tr>
                    ) : products.map(p => (
                      <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4"><img src={p.imageUrl} className="h-10 w-10 object-contain mix-blend-multiply" /></td>
                        <td className="p-4 font-medium text-gray-800"><div className="w-64 truncate">{p.title}</div></td>
                        <td className="p-4 font-bold text-gray-900">${p.price}</td>
                        <td className="p-4 text-gray-600">{p.category}</td>
                        <td className="p-4">
                          <div className="flex gap-4">
                            <button onClick={() => { setEditingProduct(p); setFormData(p); setIsAdding(false); }} className="text-blue-600 hover:text-blue-800 font-bold text-sm">Edit</button>
                            <button onClick={() => { if(confirm('Are you sure you want to delete this product?')) deleteProduct(p.id) }} className="text-red-600 hover:text-red-800 font-bold text-sm">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-2xl">
              <h2 className="text-xl font-bold mb-6 text-gray-800">Application Settings</h2>
              
              {saveSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-6 text-sm flex items-center gap-2">
                  <i className="fas fa-check-circle"></i>
                  Settings saved to database successfully!
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Header Logo URL</label>
                  <input 
                    type="text" 
                    value={settingsFormData.logoUrl}
                    onChange={e => setSettingsFormData({...settingsFormData, logoUrl: e.target.value})}
                    className="w-full border rounded p-3 text-sm focus:ring-1 focus:ring-orange-500 outline-none"
                    placeholder="Paste image address for header logo"
                    required
                  />
                  {settingsFormData.logoUrl && <img src={settingsFormData.logoUrl} alt="logo-preview" className="h-8 mt-2 object-contain" />}
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Hero Cover Image URL</label>
                  <input 
                    type="text" 
                    value={settingsFormData.heroImageUrl}
                    onChange={e => setSettingsFormData({...settingsFormData, heroImageUrl: e.target.value})}
                    className="w-full border rounded p-3 text-sm focus:ring-1 focus:ring-orange-500 outline-none"
                    placeholder="Paste image address for home hero banner"
                    required
                  />
                  {settingsFormData.heroImageUrl && <img src={settingsFormData.heroImageUrl} alt="hero-preview" className="h-20 mt-2 w-full object-cover border rounded" />}
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Default Global "Buy Now" URL</label>
                  <input 
                    type="text" 
                    value={settingsFormData.globalBuyNowUrl}
                    onChange={e => setSettingsFormData({...settingsFormData, globalBuyNowUrl: e.target.value})}
                    className="w-full border rounded p-3 text-sm focus:ring-1 focus:ring-orange-500 outline-none"
                    placeholder="Target website for redirect"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1 italic">Current redirect: {settingsFormData.globalBuyNowUrl}</p>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <button 
                    type="submit"
                    disabled={isSaving}
                    className="amazon-yellow amazon-yellow-hover py-2 px-8 rounded font-bold text-sm shadow-sm transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSaving && <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>}
                    {isSaving ? 'Saving to Database...' : 'Save All Settings'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
