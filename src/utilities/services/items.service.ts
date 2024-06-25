export const getAllItems = async () => {
  try {
    const response = await fetch('http://localhost:3000/products');
    const data = await response.json();
    console.log('Fetched items:', data); 
    return data; // Zwraca wszystkie produkty
  } catch (error) {
    console.error('Error:', error);
    return null; // Zwraca null w przypadku błędu
  }
};

// export const getItemById = async (id: number) => {
//   try {
//     const response = await fetch(`http://localhost:3000/products/${id}`);
//     const data = await response.json();
//     console.log('Fetched item by ID:', data);
//     return data; // Zwraca produkt o podanym ID
//   } catch (error) {
//     console.error('Error:', error);
//     return null; 
//   }
// };


// export const getItemById = async (id: number) => {
//   try {
//     const items = await getAllItems(); // Fetch all items (will use cached if already fetched)
//     const item = items.find(item => item.id === id);
//     console.log('Fetched item by ID:', item);
//     return item; // Return item found by ID
//   } catch (error) {
//     console.error('Error:', error);
//     return null; 
//   }
// };
    