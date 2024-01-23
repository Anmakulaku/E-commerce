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


interface PageChange {
    selected: number;
}

export function Store() {
    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageChange = (selectedPage: PageChange) => {
        setCurrentPage(selectedPage.selected);
    };

    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = storeItems.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="store__container">
        <h1 className="store__title">All</h1>
        <div className="store__products">
            {currentItems.map((item) => (
            <StoreItem key={item.id} {...item} />
            ))}
        </div>
        <ReactPaginate
            previousLabel={<MdChevronLeft className="pagination-arrow"/>}
            nextLabel={<MdChevronRight className="pagination-arrow"/>}
            breakLabel={'...'}
            pageCount={Math.ceil(storeItems.length / itemsPerPage)}
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
