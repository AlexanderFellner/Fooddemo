import { Injectable } from "@angular/core";
import { Recipe, RecipeId } from "./recipe.model";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class RecipesService {
  private recipe: Recipe;
  private imageUrl: string;
  private recipes: Observable<RecipeId[]>;
  private recipeCollection: AngularFirestoreCollection<Recipe>;
  constructor(
    private readonly storage: AngularFireStorage,
    private readonly afs: AngularFirestore
  ) {
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

  addRecipe(recipe: Recipe, selectedFile?: File) {
    if (selectedFile) {
      console.log(selectedFile);
      const storageref = this.storage.ref("images");
      const storagerefchild = storageref.child(selectedFile.name);
      storagerefchild
        .put(selectedFile)
        .then((uploadtask) => {
          storagerefchild.getDownloadURL().subscribe((imageUrl) => {
            this.imageUrl = imageUrl;
            const id = this.afs.createId();
            recipe.imageUrl = this.imageUrl;
            this.recipeCollection.doc(id).set(recipe);
            console.log("in addRecipe of recipesService");
          });
        })
        .catch((error) => console.log(error));
    } else {
      const id = this.afs.createId();
      this.recipeCollection.doc(id).set(recipe);
    }
  }
  getRecipe(recipeId: string, recipeObs: Observable<Recipe>) {
    recipeObs = this.afs.doc<Recipe>(`recipes/${recipeId}/`).valueChanges();
    return recipeObs;
  }

  getAllRecipes(): Observable<RecipeId[]> {
    //return [...this.recipes];
    return this.recipes;
    //return this.recipes;
  }
  deleteRecipe(recipeId: string) {
    console.log(recipeId);
    this.afs
      .doc<Recipe>("recipes/" + recipeId)
      .delete()
      .then((res) => {
        console.log("Recipe deleted");
      })
      .catch((error) => console.log(`error removing document ${error}`));
  }
  setRecipe(recipeItem: Recipe) {
    this.recipe = { ...recipeItem };
  }
  updateRecipe(recipeId: string, title, imageUrl, ingredients: string) {
    let ingredientslist = ingredients.split(",");
    this.afs
      .doc<Recipe>("/recipes/" + recipeId)
      .update({ title, imageUrl, ingredients: ingredientslist });
    /*  const recipe: Recipe = this.recipes.find((recipe, index) => {
      return recipeId === recipe.id;
    });
    recipe.title = title;
    recipe.imageUrl = imageUrl;
    recipe.ingredients = ingredients; */
    //console.log(recipe);
  }
}
