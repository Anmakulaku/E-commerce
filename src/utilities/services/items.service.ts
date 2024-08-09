// import { Product } from '../types/ProductType';
// import { itemsAll } from './../../_mocks_/itemsAll';

// export const getAllItems = (): Promise<Product[]> => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(itemsAll);
//     }, 300);
//   });
// };
// export const getItemById = async (id: number): Promise<Product | null> => {
//   const item = itemsAll.find(item => item.id === id);
//   return Promise.resolve(item || null);
// };


export const getAllItems = async () => {
  try {
    const response = await fetch('http://localhost:3000/products');
    const data = await response.json();
    return data; // Zwraca wszystkie produkty
  } catch (error) {
    console.error('Error:', error);
    return []; // Zwraca null w przypadku błędu
  }
};

export const getItemById = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/products/${id}`);
    const data = await response.json();
    return data; // Zwraca produkt o podanym ID
  } catch (error) {
    console.error('Error:', error);
    return null; 
  }
};



    