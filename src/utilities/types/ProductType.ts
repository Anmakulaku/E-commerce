export type uuid = string;

export type RawProduct = {
  
  id: uuid;
  name: string;
  price: number;
  gender: number;
  categoryId: uuid;
  createdAt: string;
  Category: {
    id: uuid;
    name: string;
    parentId: uuid | null;
    parentCategory: {
      id: uuid;
      name: string;
      parentId: uuid | null;
      subcategories:
        {
          id: uuid;
          name: string;
          parentId: string;
        }[];
    };
  };
  images: {
    id: uuid;
    imageUrl: string;
    isMain: boolean;
    productId: uuid;
  }[];
  sizes: {
    id: uuid;
    name: string;
    ProductSize: {
      id: uuid;
      productId: uuid;
      sizeId: uuid;
    };
  }[];
};

export type Product = {
  id: uuid;
  name: string;
  price: number;
  gender: number;
  createdAt: string;
  category: {
    id: string | undefined;
    name: string | undefined;
  };
  subcategory: {
    id: string | undefined;
    name: string | undefined;
  };
  images: Image[];
  sizes: Size[];
};

type Image = {
  id: uuid;
  imageUrl: string;
  isMain: boolean;
};

interface Size {
  id: uuid;
  name: string;
}
