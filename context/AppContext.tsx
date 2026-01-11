
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, AppConfig } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { products as initialProducts } from '../data/products';

interface AppContextType {
  products: Product[];
  config: AppConfig;
  loading: boolean;
  setProducts: (products: Product[]) => void;
  updateConfig: (config: AppConfig) => Promise<void>;
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProductsState] = useState<Product[]>([]);
  const [config, setConfigState] = useState<AppConfig>({
    logoUrl: 'https://pngimg.com/uploads/amazon/amazon_PNG11.png',
    heroImageUrl: 'https://picsum.photos/id/1015/1920/800',
    globalBuyNowUrl: 'https://www.amazon.com',
  });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!isSupabaseConfigured) {
      console.warn('Supabase is not configured properly in lib/supabase.ts');
      setProductsState(initialProducts);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      // 1. Fetch Products
      const { data: productsData, error: pError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (pError) throw pError;
      
      // If Supabase has data, use it. Otherwise use the demo data as a starter.
      if (productsData && productsData.length > 0) {
        setProductsState(productsData);
      } else {
        setProductsState(initialProducts);
      }

      // 2. Fetch Config
      const { data: configData, error: cError } = await supabase
        .from('app_config')
        .select('*')
        .eq('id', 1)
        .single();
      
      if (cError && cError.code !== 'PGRST116') throw cError;
      if (configData) setConfigState(configData);

    } catch (error: any) {
      console.error('Fetch Error:', error.message || error);
      setProductsState(initialProducts);
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
      const { error } = await supabase
        .from('app_config')
        .upsert({ id: 1, ...newConfig });
      if (error) throw error;
      setConfigState(newConfig);
    } catch (error: any) {
      alert(`Database Error: ${error.message}`);
    }
  };

  const addProduct = async (product: Product) => {
    if (!isSupabaseConfigured) return;
    try {
      // Ensure the product object matches the DB schema
      const { error } = await supabase
        .from('products')
        .insert([{
          id: product.id,
          title: product.title,
          price: product.price,
          rating: product.rating,
          reviewCount: product.reviewCount,
          imageUrl: product.imageUrl,
          category: product.category,
          description: product.description,
          brand: product.brand,
          features: product.features,
          isPrime: product.isPrime,
          stockStatus: product.stockStatus,
          buyNowUrl: product.buyNowUrl
        }]);

      if (error) throw error;
      
      // Refresh local state
      setProductsState(prev => [product, ...prev]);
      console.log('Product added successfully');
    } catch (error: any) {
      console.error('Failed to add product:', error);
      alert(`Could not save product: ${error.message}\n\nMake sure you ran the SQL in Supabase!`);
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    if (!isSupabaseConfigured) return;
    try {
      const { error } = await supabase
        .from('products')
        .update(updatedProduct)
        .eq('id', updatedProduct.id);
      
      if (error) throw error;
      setProductsState(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    } catch (error: any) {
      alert(`Update failed: ${error.message}`);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!isSupabaseConfigured) return;
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      setProductsState(prev => prev.filter(p => p.id !== id));
    } catch (error: any) {
      alert(`Delete failed: ${error.message}`);
    }
  };

  return (
    <AppContext.Provider value={{ 
      products, 
      config, 
      loading, 
      setProducts: setProductsState, 
      updateConfig, 
      addProduct, 
      updateProduct, 
      deleteProduct 
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
