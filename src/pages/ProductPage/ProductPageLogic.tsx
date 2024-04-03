import { useContext, useEffect, useState } from 'react';
import { Product } from '../../utilities/types/ProductType';
import { CartContext } from '../../context/CartContext';

export function useProductPageLogic(id: string) {
    // console.log('useProductPageLogic render');
    const { increaseCartQuantity, products } = useContext(CartContext);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [mainImage, setMainImage] = useState<string | null>(null);
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [isSizeSelected, setIsSizeSelected] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id || products.length === 0) return;

        const foundProduct = products.find(item => item.id.toString() === id);

        if (foundProduct) {
            setProduct(foundProduct);
            if (foundProduct.img) {
                setMainImage(foundProduct.img);
            } else if (foundProduct.imgOther && foundProduct.imgOther.length > 0) {
                setMainImage(foundProduct.imgOther[0]);
            }
        } else {
            setError('Product not found');
        }
    }, [id, products]);

    const handleSizeSelection = (size: string) => {
        setSelectedSize(size);
        setIsSizeSelected(false);
    };

    const addToCart = () => {
        if (!selectedSize || !product) {
            setIsSizeSelected(true);
            return;
        }
        for (let i = 0; i < quantity; i++) {
            increaseCartQuantity(product.id, selectedSize || '');
        }
        setQuantity(1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const renderImages = (mainImage: string | null, product: Product) => {
        console.log('renderImages...'); 
        const handleImageClick = (clickedImage: string) => { 
            setMainImage(clickedImage);
        };
        return (
            <div className='productPage__images'>
                {mainImage && (
                    <img src={mainImage} alt={product.name} className="productPage__imgMain" />
                )}
                <div className='productPage__imgOthers'>
                    {[product.img, ...product.imgOther].map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={index === 0 ? product.name : `${product.name} - Additional Image ${index}`}
                            onClick={() => handleImageClick(img)}
                            className={img === mainImage ? 'selected' : ''}
                        />
                    ))}
                </div>
            </div>
        );
    };

    return {
        product,
        mainImage,
        selectedSize,
        quantity,
        isSizeSelected,
        addToCart,
        error,
        setSelectedSize,
        setMainImage,
        setQuantity,
        handleSizeSelection,
        decreaseQuantity,
        increaseQuantity,
        renderImages,
    };
}
