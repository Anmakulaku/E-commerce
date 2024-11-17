export type uuid = string;

export type RawCategory = {
  id: uuid;
  name: string;
  parentId: uuid | null; // null dla nadrzędnej = clothes i accessories
};

export type Category = {
  id: uuid;
  name: string;
  parentId: uuid | null;
  subcategories?: Category[];
  parentCategory?: Category | null;
};
