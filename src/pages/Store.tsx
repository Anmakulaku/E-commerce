import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { StoreItem } from '../components/StoreItem';
import { Footer } from '../components/Footer';
import './Store.css';
import { Subscribe } from '../components/Subscribe';
import { Gallery } from '../components/Gallery';
import { Slider } from '../components/Slider';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'; 
import { getAllItems } from '../utilities/services/items.service'; 
import { Product } from '../utilities/services/items.service';

interface PageChange {
    selected: number;
}

export function Store() {
    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
    const [storeItems, setStoreItems] = useState<Product[]>([]); 

    useEffect(() => {
        getAllItems().then((data) => {
            setStoreItems(data);
        });
    }, []); 
    
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
        <div className='store'>
            <div className="store__container">
                <div className="store__categorySelection">
                    <button onClick={handleShowAll} className='story__categoryItems'>Show All</button>
                    <button onClick={() => handleCategoryChange('accessories')} className='story__categoryItems'>Accessories</button>
                    <button onClick={() => handleCategoryChange('clothes')} className='story__categoryItems'>Clothes</button>
                </div>
                {selectedCategory && (
                    <div className="store__subcategorySelection">
                        {selectedCategory === 'accessories' ? (
                            <div className='store__subcategorySelection'>
                                <button onClick={() => handleSubcategoryChange('bags')} className='story__subcategoryItems'>Bags</button>
                                <button onClick={() => handleSubcategoryChange('earrings')} className='story__subcategoryItems'>Earrings</button>
                                <button onClick={() => handleSubcategoryChange('wallets')} className='story__subcategoryItems'>Wallets</button>
                                <button onClick={() => handleSubcategoryChange('hats')} className='story__subcategoryItems'>Hats</button>
                                <button onClick={() => handleSubcategoryChange('sunglasses')} className='story__subcategoryItems'>Sunglasses</button>
                            </div>
                        ) : selectedCategory === 'clothes' ? (
                            <div className='store__subcategorySelection'>
                                <button onClick={() => handleSubcategoryChange('trousers')} className='story__subcategoryItems'>Trousers</button>
                                <button onClick={() => handleSubcategoryChange('tops')} className='story__subcategoryItems'>Tops</button>
                                <button onClick={() => handleSubcategoryChange('hoodies')} className='story__subcategoryItems'>Hoodies & Sweatshirts</button>
                                <button onClick={() => handleSubcategoryChange('jackets')} className='story__subcategoryItems'>Jackets</button>
                                <button onClick={() => handleSubcategoryChange('dresses')} className='story__subcategoryItems'>Dresses</button>
                            </div>
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
                    previousLabel={<MdChevronLeft className="store__pagination-arrow" />}
                    nextLabel={<MdChevronRight className="store__pagination-arrow" />}
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
        </div>
    );
}
