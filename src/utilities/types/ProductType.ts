export interface Product {
    id: number;
    gender: string;
    category: string;
    subcategory?: string;
    img: string;
    imgOther: string[];
    name: string;
    price: number;
    addDate: Date;
    sizes: { sizeName: string; value: number }[];
}