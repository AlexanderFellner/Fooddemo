export interface Recipe {
  title: string;
  imageUrl: string;
  ingredients: string[];
  uuid?: string;
}
export interface RecipeId extends Recipe {
  id: string;
}
