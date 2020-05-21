import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";

@Injectable({
  providedIn: "root",
})
export class RecipesService {
  private recipes: Recipe[] = [
    {
      id: 0,
      title: "Schnitzel",
      imageUrl: "https://www.gutekueche.at/img/rezept/170/wiener-schnitzel.jpg",
      ingredients: ["French Fries", "Pork Meat", "Salad"],
    },
    {
      id: 1,
      title: "Spaghetti",
      imageUrl:
        "https://www.gutekueche.at/img/rezept/22388/300x199_spagetti-bolognese.jpg",
      ingredients: ["Bolognese", "Noodles", "Tomatosauce"],
    },
  ];
  constructor() {}
  getAllRecipes() {
    //return [...this.recipes];
    return this.recipes;
  }
  getRecipe(recipeId: number) {
    return {
      ...this.recipes.find((recipe) => {
        return recipe.id === recipeId;
      }),
    };
  }
  deleteRecipe(recipeId: number) {
    this.recipes = this.recipes.filter((recipe) => {
      return recipe.id !== recipeId;
    });
    console.log(this.recipes);
  }
  updateRecipe(recipeId: number, title, imageUrl, ingredients) {
    const recipe: Recipe = this.recipes.find((recipe, index) => {
      return recipeId === recipe.id;
    });
    recipe.title = title;
    recipe.imageUrl = imageUrl;
    recipe.ingredients = ingredients;
    console.log(recipe);
  }
}
