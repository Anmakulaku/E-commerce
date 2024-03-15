import { useEffect, useState } from 'react';
import { getAllItems, Product } from '../../utilities/services/items.service';

interface StoreLogicProps {
    selectedCategory: string | null;
    selectedSubcategory: string | null;
    currentPage: number;
    itemsPerPage: number;
}

export function useStoreLogic({ selectedCategory, selectedSubcategory, currentPage, itemsPerPage }: StoreLogicProps) {

    const [storeItems, setStoreItems] = useState<Product[]>([]);
    const [paginatedItems, setPaginatedItems] = useState<Product[]>([]);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        
        getAllItems().then((data) => {
            setStoreItems(data);
        });
    }, [selectedCategory, selectedSubcategory]);

    useEffect(() => {
        if (storeItems.length === 0) return; // Sprawdź, czy storeItems nie jest puste
        const totalItemsCount = storeItems
            .filter(item => !selectedCategory || item.category === selectedCategory)
            .filter(item => !selectedSubcategory || item.subcategory === selectedSubcategory)
            .length;
        console.log("Total items count:", totalItemsCount);
        const itemsPerPage = 12;
        setPageCount(Math.ceil(totalItemsCount / itemsPerPage));

        const indexOfLastItem = (currentPage + 1) * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;

        const sortedItems = storeItems
            .filter(item => !selectedCategory || item.category === selectedCategory)
            .filter(item => !selectedSubcategory || item.subcategory === selectedSubcategory)
            .sort((a, b) => b.addDate.getTime() - a.addDate.getTime())
            .slice(indexOfFirstItem, indexOfLastItem);

        setPaginatedItems(sortedItems);
    }, [currentPage, itemsPerPage, selectedCategory, selectedSubcategory, storeItems]);

    return {
        paginatedItems,
        pageCount,
    };
}