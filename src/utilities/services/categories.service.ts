import { RawCategory, Category } from '../types/CategoryType';

export class CategoriesService {
  static async getCategories(): Promise<RawCategory[]> {
    const response = await fetch('http://localhost:3000/products/categories');
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const categories: RawCategory[] = await response.json();
    console.log('Fetched Categories:', categories); //LOOOOOOOOOOOOOGGGGGGGGGGGG
    return categories;
  }

  static mapCategories(categories: RawCategory[]): Category[] {
    const categoryMap: { [key: string]: Category } = {};

    // Tworzenie wszystkich kategorii i subkategorii
    categories.forEach(category => {
      categoryMap[category.id] = {
        id: category.id,
        name: category.name,
        parentId: category.parentId,
        subcategories: [],
        parentCategory: null,
      };
    });


    // Przypisanie subkategorii do odpowiednich rodziców
    categories.forEach(category => {
      if (category.parentId) {
        const parentCategory = categoryMap[category.parentId];
        if (parentCategory) {
          parentCategory.subcategories?.push(categoryMap[category.id]);
          categoryMap[category.id].parentCategory = parentCategory;
        }
      }
    });

    // Kategorie główne (bez rodzica)
    const mainCategories = Object.values(categoryMap).filter(
      category => !category.parentId,
    );
    console.log('Main Categories:', mainCategories);
    // Subkategorie (z rodzicem)
    const subcategories = Object.values(categoryMap).filter(
      category => category.parentId,
    );
    console.log('Subcategories:', subcategories); 

    return mainCategories;
  }
}
