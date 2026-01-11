
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Product, AppConfig, Category } from '../types';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    products, categories, config, loading, 
    updateConfig, addProduct, updateProduct, deleteProduct,
    addCategory, updateCategory, deleteCategory 
  } = useAppContext();
  
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'settings'>('products');
  const [isSaving, setIsSaving] = useState(false);
  
  // Product States
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<Product>({
    id: '', title: '', price: 0, rating: 4.5, reviewCount: 0, imageUrl: '',
    category: '', description: '', brand: '', features: [], isPrime: true,
    stockStatus: 'In Stock'
  });

  // Category States
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryForm, setCategoryForm] = useState<Category>({ id: '', name: '', imageUrl: '' });

  // Settings States
  const [settingsFormData, setSettingsFormData] = useState<AppConfig>(config);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') !== 'true') navigate('/login');
  }, [navigate]);

  useEffect(() => { setSettingsFormData(config); }, [config]);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    navigate('/');
  };

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    if (isAddingProduct) await addProduct({ ...productForm, id: Date.now().toString() });
    else await updateProduct(productForm);
    setIsSaving(false);
    setIsAddingProduct(false);
    setEditingProduct(null);
  };

  const handleSubmitCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    if (isAddingCategory) await addCategory({ ...categoryForm, id: 'cat_' + Date.now() });
    else await updateCategory(categoryForm);
    setIsSaving(false);
    setIsAddingCategory(false);
    setEditingCategory(null);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateConfig(settingsFormData);
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="amazon-blue-dark p-6 flex justify-between items-center text-white">
          <h1 className="text-2xl font-bold">Admin Control Panel</h1>
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-bold">Logout</button>
        </div>

        <div className="flex border-b border-gray-200">
          {['products', 'categories', 'settings'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-8 py-4 font-bold text-sm capitalize ${activeTab === tab ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* PRODUCTS TAB */}
          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between mb-6">
                <h2 className="text-xl font-bold">Products ({products.length})</h2>
                <button onClick={() => { setIsAddingProduct(true); setProductForm({ ...productForm, id: '' }); }} className="amazon-yellow px-4 py-2 rounded font-bold text-sm">Add Product</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-4">Img</th>
                      <th className="p-4">Title</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id} className="border-b">
                        <td className="p-4"><img src={p.imageUrl} className="h-10 w-10 object-contain" /></td>
                        <td className="p-4 truncate max-w-xs">{p.title}</td>
                        <td className="p-4 font-bold">${p.price}</td>
                        <td className="p-4 space-x-4">
                          <button onClick={() => { setEditingProduct(p); setProductForm(p); setIsAddingProduct(false); }} className="text-blue-600">Edit</button>
                          <button onClick={() => deleteProduct(p.id)} className="text-red-600">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CATEGORIES TAB */}
          {activeTab === 'categories' && (
            <div>
              <div className="flex justify-between mb-6">
                <h2 className="text-xl font-bold">Home Categories ({categories.length})</h2>
                <button onClick={() => { setIsAddingCategory(true); setCategoryForm({ id: '', name: '', imageUrl: '' }); }} className="amazon-yellow px-4 py-2 rounded font-bold text-sm">Add Category</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map(c => (
                  <div key={c.id} className="border p-4 rounded flex flex-col items-center gap-2">
                    <img src={c.imageUrl} className="h-32 w-full object-cover rounded" />
                    <h3 className="font-bold">{c.name}</h3>
                    <div className="flex gap-4 mt-2">
                      <button onClick={() => { setEditingCategory(c); setCategoryForm(c); setIsAddingCategory(false); }} className="text-sm text-blue-600">Edit</button>
                      <button onClick={() => deleteCategory(c.id)} className="text-sm text-red-600">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="max-w-xl space-y-4">
               {saveSuccess && <div className="bg-green-100 p-2 rounded text-green-700">Settings saved!</div>}
               <div><label className="block text-sm font-bold">Logo URL</label><input className="w-full border p-2" value={settingsFormData.logoUrl} onChange={e => setSettingsFormData({...settingsFormData, logoUrl: e.target.value})} /></div>
               <div><label className="block text-sm font-bold">Hero Image URL</label><input className="w-full border p-2" value={settingsFormData.heroImageUrl} onChange={e => setSettingsFormData({...settingsFormData, heroImageUrl: e.target.value})} /></div>
               <div><label className="block text-sm font-bold">Global Buy URL</label><input className="w-full border p-2" value={settingsFormData.globalBuyNowUrl} onChange={e => setSettingsFormData({...settingsFormData, globalBuyNowUrl: e.target.value})} /></div>
               <button type="submit" className="amazon-yellow px-8 py-2 rounded font-bold">Save Settings</button>
            </form>
          )}
        </div>
      </div>

      {/* MODALS */}
      {(isAddingProduct || editingProduct) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSubmitProduct} className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold">{isAddingProduct ? 'Add Product' : 'Edit Product'}</h2>
            <input placeholder="Title" className="w-full border p-2" value={productForm.title} onChange={e => setProductForm({...productForm, title: e.target.value})} />
            <input placeholder="Price" type="number" className="w-full border p-2" value={productForm.price} onChange={e => setProductForm({...productForm, price: parseFloat(e.target.value)})} />
            <input placeholder="Image URL" className="w-full border p-2" value={productForm.imageUrl} onChange={e => setProductForm({...productForm, imageUrl: e.target.value})} />
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => { setIsAddingProduct(false); setEditingProduct(null); }} className="p-2">Cancel</button>
              <button type="submit" className="amazon-yellow p-2 px-4 rounded font-bold">Save</button>
            </div>
          </form>
        </div>
      )}

      {(isAddingCategory || editingCategory) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSubmitCategory} className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold">{isAddingCategory ? 'Add Category' : 'Edit Category'}</h2>
            <input placeholder="Category Name" className="w-full border p-2" value={categoryForm.name} onChange={e => setCategoryForm({...categoryForm, name: e.target.value})} />
            <input placeholder="Image URL" className="w-full border p-2" value={categoryForm.imageUrl} onChange={e => setCategoryForm({...categoryForm, imageUrl: e.target.value})} />
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => { setIsAddingCategory(false); setEditingCategory(null); }} className="p-2">Cancel</button>
              <button type="submit" className="amazon-yellow p-2 px-4 rounded font-bold">Save Category</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
