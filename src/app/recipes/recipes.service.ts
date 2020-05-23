import { Injectable } from "@angular/core";
import { Recipe, RecipeId } from "./recipe.model";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
  AngularFirestoreDocument,
  DocumentSnapshot,
  DocumentData,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class RecipesService {
  private recipeId: RecipeId;
  private recipe: Recipe;
  private recipes: Observable<RecipeId[]>;
  private recipeCollection: AngularFirestoreCollection<Recipe>;
  private recipeDocument: AngularFirestoreDocument<Recipe>;
  constructor(private readonly afs: AngularFirestore) {
    this.recipeCollection = this.afs.collection<Recipe>("recipes");

    this.recipes = this.recipeCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Recipe;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }
  /* private recipes: Recipe[] = [
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
  ]; */

  addRecipe(recipe: Recipe) {
    const id = this.afs.createId();
    this.recipeCollection.doc(id).set(recipe);
  }

  getAllRecipes(): Observable<RecipeId[]> {
    //return [...this.recipes];
    return this.recipes;
    //return this.recipes;
  }
  getRecipe() {
    if (this.recipe != null) {
      return this.recipe;
    }
  }
  deleteRecipe(recipeId: number) {
    /*   this.recipes = this.recipes.filter((recipe) => {
      return recipe.id !== recipeId;
    }); */
    console.log(this.recipes);
  }
  setRecipe(recipeItem: Recipe) {
    this.recipe = { ...recipeItem };
  }
  updateRecipe(recipeId: number, title, imageUrl, ingredients) {
    /*  const recipe: Recipe = this.recipes.find((recipe, index) => {
      return recipeId === recipe.id;
    });
    recipe.title = title;
    recipe.imageUrl = imageUrl;
    recipe.ingredients = ingredients; */
    //console.log(recipe);
  }
}
