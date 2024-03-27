import { useContext, useEffect, useState } from 'react';
import { Product } from '../../utilities/types/ProductType';
import { ShoppingCartContext } from '../../context/ShoppingCartContext';

interface StoreLogicProps {
    selectedCategory: string | null;
    selectedSubcategory: string | null;
    currentPage: number;
    itemsPerPage: number;
}

export function useStoreLogic({ selectedCategory, selectedSubcategory, currentPage, itemsPerPage }: StoreLogicProps) {

    const { products } = useContext(ShoppingCartContext);
    const [paginatedItems, setPaginatedItems] = useState<Product[]>([]);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        if (products.length === 0) return; // SJeśli dane nie są dostepne, nie renderuj dalej

        const totalItemsCount = products
            .filter(item => !selectedCategory || item.category === selectedCategory)
            .filter(item => !selectedSubcategory || item.subcategory === selectedSubcategory)
            .length;
        console.log("Total items count:", totalItemsCount);
        const itemsPerPage = 12;
        setPageCount(Math.ceil(totalItemsCount / itemsPerPage));

        const indexOfLastItem = (currentPage + 1) * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;

        const sortedItems = products
            .filter(item => !selectedCategory || item.category === selectedCategory)
            .filter(item => !selectedSubcategory || item.subcategory === selectedSubcategory)
            .sort((a, b) => b.addDate.getTime() - a.addDate.getTime())
            .slice(indexOfFirstItem, indexOfLastItem);

        setPaginatedItems(sortedItems);
    }, [currentPage, itemsPerPage, selectedCategory, selectedSubcategory, products]);

    return {
        paginatedItems,
        pageCount,
    };
}