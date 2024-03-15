import {itemsAll} from './../../_mocks_/itemsAll'

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
    sizes: { size: string; quantity: number }[];
}

export const getAllItems = (): Promise <Product []> => {
    return new Promise((resolve => {
        setTimeout(() => {
            resolve(itemsAll);
        }, 300);
    }))
}
export const getItemById = async (id: number): Promise<Product | null> => {
    const item = itemsAll.find(item => item.id === id);
    return Promise.resolve(item || null);
}