
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, AppConfig, Category } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { products as initialProducts } from '../data/products';

interface AppContextType {
  products: Product[];
  categories: Category[];
  config: AppConfig;
  loading: boolean;
  setProducts: (products: Product[]) => void;
  updateConfig: (config: AppConfig) => Promise<void>;
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addCategory: (category: Category) => Promise<void>;
  updateCategory: (category: Category) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProductsState] = useState<Product[]>([]);
  const [categories, setCategoriesState] = useState<Category[]>([]);
  const [config, setConfigState] = useState<AppConfig>({
    logoUrl: 'https://pngimg.com/uploads/amazon/amazon_PNG11.png',
    heroImageUrl: 'https://picsum.photos/id/1015/1920/800',
    globalBuyNowUrl: 'https://www.amazon.com',
  });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!isSupabaseConfigured) {
      setProductsState(initialProducts);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      // 1. Fetch Products
      const { data: productsData } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (productsData && productsData.length > 0) setProductsState(productsData);
      else setProductsState(initialProducts);

      // 2. Fetch Categories
      const { data: categoriesData } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (categoriesData) setCategoriesState(categoriesData);

      // 3. Fetch Config
      const { data: configData } = await supabase
        .from('app_config')
        .select('*')
        .eq('id', 1)
        .single();
      
      if (configData) setConfigState(configData);

    } catch (error: any) {
      console.error('Fetch Error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateConfig = async (newConfig: AppConfig) => {
    if (!isSupabaseConfigured) return;
    try {
      await supabase.from('app_config').upsert({ id: 1, ...newConfig });
      setConfigState(newConfig);
    } catch (error: any) { alert(error.message); }
  };

  const addProduct = async (product: Product) => {
    if (!isSupabaseConfigured) return;
    try {
      await supabase.from('products').insert([product]);
      setProductsState(prev => [product, ...prev]);
    } catch (error: any) { alert(error.message); }
  };

  const updateProduct = async (updatedProduct: Product) => {
    if (!isSupabaseConfigured) return;
    try {
      await supabase.from('products').update(updatedProduct).eq('id', updatedProduct.id);
      setProductsState(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    } catch (error: any) { alert(error.message); }
  };

  const deleteProduct = async (id: string) => {
    if (!isSupabaseConfigured) return;
    try {
      await supabase.from('products').delete().eq('id', id);
      setProductsState(prev => prev.filter(p => p.id !== id));
    } catch (error: any) { alert(error.message); }
  };

  const addCategory = async (category: Category) => {
    try {
      await supabase.from('categories').insert([category]);
      setCategoriesState(prev => [...prev, category]);
    } catch (error: any) { alert(error.message); }
  };

  const updateCategory = async (cat: Category) => {
    try {
      await supabase.from('categories').update(cat).eq('id', cat.id);
      setCategoriesState(prev => prev.map(c => c.id === cat.id ? cat : c));
    } catch (error: any) { alert(error.message); }
  };

  const deleteCategory = async (id: string) => {
    try {
      await supabase.from('categories').delete().eq('id', id);
      setCategoriesState(prev => prev.filter(c => c.id !== id));
    } catch (error: any) { alert(error.message); }
  };

  return (
    <AppContext.Provider value={{ 
      products, categories, config, loading, 
      setProducts: setProductsState, 
      updateConfig, addProduct, updateProduct, deleteProduct,
      addCategory, updateCategory, deleteCategory
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
