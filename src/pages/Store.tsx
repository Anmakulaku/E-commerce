import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { StoreItem } from '../components/StoreItem';
import { Footer } from '../components/Footer';
import storeItems from '../data/itemsAll.json';
import './Store.css';
import { Subscribe } from '../components/Subscribe';
import { Gallery } from '../components/Gallery';
import { Slider } from '../components/Slider';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

interface Product {
    id: number;
    gender: string;
    category: string;
    subcategory?: string;
    img: string;
    imgOther: string[];
    name: string;
    price: number;
}

interface PageChange {
    selected: number;
}

export function Store() {
    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

    const handlePageChange = (selectedPage: PageChange) => {
        setCurrentPage(selectedPage.selected);
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setSelectedSubcategory(null); 
    };
    
    const handleShowAll = () => {
        setSelectedCategory(null);
        setSelectedSubcategory(null);
    };

    const handleSubcategoryChange = (subcategory: string) => {
        setSelectedSubcategory(subcategory);
    };

    const getCategoryPath = () => {
        if (selectedCategory && selectedSubcategory) {
            return `${selectedCategory} > ${selectedSubcategory}`;
        } else if (selectedCategory) {
            return selectedCategory;
        } else {
            return 'All';
        }
    };

    const filteredItems = storeItems.filter((item) => {
        if (selectedCategory && item.category !== selectedCategory) {
            return false;
        }
        if (selectedSubcategory && item.subcategory !== selectedSubcategory) {
            return false;
        }
        return true;
    });

    const filterItems = (items: Product[]) => {
        return items
            .filter(item => !selectedCategory || item.category === selectedCategory)
            .filter(item => !selectedSubcategory || item.subcategory === selectedSubcategory);
    };
    const sortedItems = filterItems(storeItems).sort(() => Math.random() - 0.5);

    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);
    

    return (
        <div className="store__container">
            <div className="category__selection">
                <button onClick={handleShowAll}>Show All</button>
                <button onClick={() => handleCategoryChange('accessories')}>Accessories</button>
                <button onClick={() => handleCategoryChange('clothes')}>Clothes</button>
            </div>
            {selectedCategory && (
                <div className="subcategory__selection">
                    {selectedCategory === 'accessories' ? (
                        <>
                            <button onClick={() => handleSubcategoryChange('bags')}>Bags</button>
                            <button onClick={() => handleSubcategoryChange('earrings')}>Earrings</button>
                            <button onClick={() => handleSubcategoryChange('wallets')}>Wallets</button>
                            <button onClick={() => handleSubcategoryChange('hats')}>Hats</button>
                            <button onClick={() => handleSubcategoryChange('sunglasses')}>Sunglasses</button>
                        </>
                    ) : selectedCategory === 'clothes' ? (
                        <>
                            <button onClick={() => handleSubcategoryChange('trousers')}>Trousers</button>
                            <button onClick={() => handleSubcategoryChange('tops')}>Tops</button>
                            <button onClick={() => handleSubcategoryChange('hoodies')}>Hoodies & Sweatshirts</button>
                            <button onClick={() => handleSubcategoryChange('jackets')}>Jackets</button>
                            <button onClick={() => handleSubcategoryChange('dresses')}>Dresses</button>
                        </>
                    ) : null}
                </div>
            )}
            <h1 className="store__title">{getCategoryPath()}</h1>
            <div className="store__products">
                {currentItems.map((item) => (
                    <StoreItem key={item.id} {...item} />
                ))}
            </div>
            <ReactPaginate
                previousLabel={<MdChevronLeft className="pagination-arrow" />}
                nextLabel={<MdChevronRight className="pagination-arrow" />}
                breakLabel={'...'}
                pageCount={Math.ceil(filteredItems.length / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
            <Slider />
            <Gallery />
            <Subscribe />
            <Footer />
        </div>
    );
}
