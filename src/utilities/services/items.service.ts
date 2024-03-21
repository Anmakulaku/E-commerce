import { Product } from '../types/ProductType';
import {itemsAll} from './../../_mocks_/itemsAll'

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
