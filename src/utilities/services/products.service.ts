import { RawProduct, Product } from '../types/ProductType';

const API_URL = 'http://localhost:3000/products/';

export class ProductService {
  static async fetchAllProducts(): Promise<Product[]> {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const rawProducts: RawProduct[] = await response.json();
      return rawProducts.map(ProductService.transformRawProduct);
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  static async fetchProductById(id: string): Promise<Product | null> {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const rawProduct: RawProduct = await response.json();
      return ProductService.transformRawProduct(rawProduct);
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      return null;
    }
  }

  static transformRawProduct(rawProduct: RawProduct): Product {
    return {
      id: rawProduct.id,
      name: rawProduct.name,
      price: rawProduct.price,
      gender: rawProduct.gender,
      createdAt: rawProduct.createdAt,
      subcategory: {
        id: rawProduct.Category.id,
        name: rawProduct.Category.name,
      },
      category: {
        id: rawProduct.Category.parentCategory.id,
        name: rawProduct.Category.parentCategory.name,
      },
      images: rawProduct.images.map(image => ({
        id: image.id,
        imageUrl: image.imageUrl,
        isMain: image.isMain,
      })),
      sizes: rawProduct.sizes.map(size => ({
        id: size.id,
        name: size.name,
      })),
    };
  }
}
