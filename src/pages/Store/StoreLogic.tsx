import { useMemo } from 'react';
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

  const filteredProducts = useMemo(() => {
    console.log('Original products:', products);
    let filtered = products;

    if (selectedCategory) {
      const category = categories.find(cat => cat.name === selectedCategory);
      console.log('Selected category:', selectedCategory);
      console.log('Found category object:', category);

      if (category) {
        filtered = filtered.filter(
          product => product.category.name === category.name,
        );
      }
      console.log('Filtered products after category:', filtered);
    }

    if (selectedSubcategory) {
      filtered = filtered.filter(
        product => product.subcategory?.name === selectedSubcategory,
      );
      console.log('Filtered products after subcategory:', filtered);
    }

    return filtered;
  }, [products, selectedCategory, selectedSubcategory, categories]);

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedItems = useMemo(() => {
    const start = currentPage * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  return {
    paginatedItems,
    pageCount,
  };
}
