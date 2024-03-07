import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { itemsAll } from '../../_mocks_/itemsAll';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { Product } from '../../utilities/services/items.service';

export function useProductPageLogic() {
    const { increaseCartQuantity, removeFromCart } = useShoppingCart();
    const { id } = useParams<{ id?: string }>();

    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [mainImage, setMainImage] = useState<string | null>(null);
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [isSizeSelected, setIsSizeSelected] = useState<boolean>(false);

    let productId = -1;

    if (id) {
        productId = parseInt(id, 10);
    }

    useEffect(() => {
        const fetchData = async () => {
            const foundProduct = itemsAll.find(item => item.id === productId);

            if (foundProduct) {
                setProduct(foundProduct);

                if (foundProduct.img) {
                    setMainImage(foundProduct.img);
                } else if (foundProduct.imgOther && foundProduct.imgOther.length > 0) {
                    setMainImage(foundProduct.imgOther[0]);
                }
            }
        };

        fetchData();
    }, [id, productId]);

    const handleSizeSelection = (size: string) => {
        setSelectedSize(size);
        setIsSizeSelected(false);
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            setIsSizeSelected(true);
            return;
        }
        for (let i = 0; i < quantity; i++) {
            increaseCartQuantity(productId, selectedSize || '');
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
        setSelectedSize,
        setMainImage,
        setQuantity,
        handleSizeSelection,
        handleAddToCart,
        decreaseQuantity,
        increaseQuantity,
        removeFromCart,
        renderImages,
    };
}
