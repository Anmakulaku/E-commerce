import ReactPaginate from 'react-paginate';
import StoreItem from '../../components/Store/StoreItem';
import { Footer } from '../../components/Footer/Footer';
import './Store.css';
import { Subscribe } from '../../components/Subscribe/Subscribe';
import { Gallery } from '../../components/Gallery/Gallery';
import { Slider } from '../../components/Slider/Slider';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useStoreLogic } from './StoreLogic';
import { useState } from 'react';


export function Store() {
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
    const itemsPerPage = 12;

    const { paginatedItems, pageCount } = useStoreLogic({
        selectedCategory,
        selectedSubcategory,
        currentPage,
        itemsPerPage,
    });

const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
    window.scrollTo(0, 0);
};

const handleCategoryChange = (category: string) => {
    // console.log("Selected category:", category);
    setSelectedCategory(category);
    setSelectedSubcategory(null);
};

const handleShowAll = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
};

const handleSubcategoryChange = (subcategory: string) => {
    // console.log("Selected subcategory:", subcategory);
    setSelectedSubcategory(subcategory);
};

function renderSubcategoryButtons() {
    if (selectedCategory === 'accessories') {
        return (
            <div className='store__subcategorySelection'>
                <button onClick={() => handleSubcategoryChange('bags')} className='story__subcategoryItems'>Bags</button>
                <button onClick={() => handleSubcategoryChange('earrings')} className='story__subcategoryItems'>Earrings</button>
                <button onClick={() => handleSubcategoryChange('wallets')} className='story__subcategoryItems'>Wallets</button>
                <button onClick={() => handleSubcategoryChange('hats')} className='story__subcategoryItems'>Hats</button>
                <button onClick={() => handleSubcategoryChange('sunglasses')} className='story__subcategoryItems'>Sunglasses</button>
            </div>
        );
    } else if (selectedCategory === 'clothes') {
        return (
            <div className='store__subcategorySelection'>
                <button onClick={() => handleSubcategoryChange('trousers')} className='story__subcategoryItems'>Trousers</button>
                <button onClick={() => handleSubcategoryChange('tops')} className='story__subcategoryItems'>Tops</button>
                <button onClick={() => handleSubcategoryChange('hoodies')} className='story__subcategoryItems'>Hoodies & Sweatshirts</button>
                <button onClick={() => handleSubcategoryChange('jackets')} className='story__subcategoryItems'>Jackets</button>
                <button onClick={() => handleSubcategoryChange('dresses')} className='story__subcategoryItems'>Dresses</button>
            </div>
        );
    } else {
        return null;
    }
}
const getCategoryPath = () => {
    if (selectedCategory && selectedSubcategory) {
        return `${selectedCategory} > ${selectedSubcategory}`;
    } else if (selectedCategory) {
        return selectedCategory;
    } else {
        return 'All';
    }
};

    return (
        <div className='store'>
            <div className="store__container">
            <div className="store__categorySelection">
                <button onClick={handleShowAll} className='story__categoryItems'>Show All</button>
                <button onClick={() => handleCategoryChange('clothes')} className='story__categoryItems'>Clothes</button>
                <button onClick={() => handleCategoryChange('accessories')} className='story__categoryItems'>Accessories</button>
            </div>
            {selectedCategory && (
                <div className="store__subcategorySelection">
                    {renderSubcategoryButtons()}
                </div>
            )}
                <h1 className="store__title">{getCategoryPath()}</h1>
                <div className="store__products">
                    {paginatedItems.map((item) => (
                        <StoreItem key={item.id} {...item} />
                    ))}
                </div>
                <ReactPaginate
                    previousLabel={<MdChevronLeft className="store__pagination-arrow" />}
                    nextLabel={<MdChevronRight className="store__pagination-arrow" />}
                    breakLabel={'...'}
                    pageCount={pageCount}
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
