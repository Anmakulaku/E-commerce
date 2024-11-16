import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import StoreItem from '../../components/Store/StoreItem';
import { Footer } from '../../components/Footer/Footer';
import './Store.css';
import { Subscribe } from '../../components/Subscribe/Subscribe';
import { Gallery } from '../../components/Gallery/Gallery';
import { Slider } from '../../components/Slider/Slider';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useStoreLogic } from './StoreLogic';
import { CategoriesService } from '../../utilities/services/categories.service';
import { Category } from '../../utilities/types/CategoryType';
import LoadingContainer from '../../components/LoadingContainer/LoadingContainer';

export function Store() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const itemsPerPage = 12;
  const { paginatedItems, pageCount, loading } = useStoreLogic({
    selectedCategory,
    selectedSubcategory,
    currentPage,
    itemsPerPage,
    categories,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCategories = async () => {
      try {
        const rawCategories = await CategoriesService.getCategories();
        const mappedCategories = CategoriesService.mapCategories(rawCategories);
        setCategories(mappedCategories);
        setTimeout(() => {
          setIsFullyLoaded(true);
        }, 600);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setIsFullyLoaded(true); 
      }
    };

    fetchCategories();
  }, []);

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
    window.scrollTo(0, 0);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null); 
    setCurrentPage(0);
  };

  const handleShowAll = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setCurrentPage(0);
  };

  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    setCurrentPage(0);
  };

  // Funkcja renderująca przyciski subkategorii
  const renderSubcategoryButtons = () => {
    const category = categories.find(cat => cat.name === selectedCategory);

    if (category && category.subcategories) {
      return (
        <div className='store__subcategorySelection'>
          {category.subcategories.map(subcategory => (
            <button
              key={subcategory.id}
              onClick={() => handleSubcategoryChange(subcategory.name)}
              className='story__subcategoryItems'
            >
              {subcategory.name}
            </button>
          ))}
        </div>
      );
    }

    return null;
  };

  const getCategoryPath = () => {
    const category = categories.find(cat => cat.name === selectedCategory);
    const subcategory = category?.subcategories?.find(
      subcat => subcat.name === selectedSubcategory,
    );

    if (category && subcategory) {
      return `${category.name} > ${subcategory.name}`;
    } else if (category) {
      return category.name;
    } else {
      return 'All';
    }
  };

  return (
    <main className='store'>
      <div className='store__container'>
        <div className='store__categorySelection'>
          <button onClick={handleShowAll} className='story__categoryItems'>
            Show All
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.name || '')}
              className='story__categoryItems'
            >
              {category.name}
            </button>
          ))}
        </div>
        {selectedCategory && (
          <div className='store__subcategorySelection'>
            {renderSubcategoryButtons()}
          </div>
        )}
        <h1 className='store__title'>{getCategoryPath()}</h1>
        {loading || !isFullyLoaded ? (
          <LoadingContainer />
        ) : (
          <section className='store__products'>
            {paginatedItems.map(product => (
              <StoreItem key={product.id} id={product.id} />
            ))}
          </section>
        )}
        <ReactPaginate
          previousLabel={<MdChevronLeft className='store__pagination-arrow' />}
          nextLabel={<MdChevronRight className='store__pagination-arrow' />}
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
    </main>
  );
}
