import { useEffect, useMemo, useState } from 'react';
import { Category } from '../../utilities/types/CategoryType';
import { useProducts } from '../../context/ProductContext';

interface StoreLogicProps {
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  currentPage: number;
  itemsPerPage: number;
  categories: Category[];
}

export function useStoreLogic({
  selectedCategory,
  selectedSubcategory,
  currentPage,
  itemsPerPage,
  categories,
}: StoreLogicProps) {
  const { products } = useProducts();
  const [loading, setLoading] = useState(true);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory) {
      const category = categories.find(cat => cat.name === selectedCategory);
      if (category) {
        filtered = filtered.filter(product => product.category.name === category.name);
      }
    }

    if (selectedSubcategory) {
      filtered = filtered.filter(product => product.subcategory?.name === selectedSubcategory);
    }

    return filtered;
  }, [products, selectedCategory, selectedSubcategory, categories]);

  useEffect(() => {
    if (products.length > 0) {
      setLoading(false);
    }
  }, [products]);

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedItems = useMemo(() => {
    const start = currentPage * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  return {
    paginatedItems,
    pageCount,
    loading
  };
}
