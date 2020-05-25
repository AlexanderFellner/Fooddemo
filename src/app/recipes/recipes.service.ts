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
  addOrUpdataRecipe(
    recipeId?: string,
    title?: string,
    imageUrl?: string,
    ingredients?: string,
    selectedFile?: File,
    recipe?: Recipe
  ) {
    if (selectedFile) {
      console.log(selectedFile);
      const storageref = this.storage.ref("images");
      const storagerefchild = storageref.child(selectedFile.name);
      storagerefchild
        .put(selectedFile)
        .then((uploadtask) => {
          storagerefchild.getDownloadURL().subscribe((imageUrl) => {
            this.imageUrl = imageUrl;

            if (!recipeId) {
              const id = this.afs.createId();
              recipe.imageUrl = this.imageUrl;
              this.recipeCollection.doc(id).set(recipe);
            }
            if (recipeId) {
              let ingredientslist = ingredients.split(",");
              this.afs
                .doc<Recipe>("/recipes/" + recipeId)
                .update({ title, imageUrl, ingredients: ingredientslist });
            }
          });
        })
        .catch((error) => console.log(error));
    } else {
      if (!recipeId) {
        const id = this.afs.createId();
        this.recipeCollection.doc(id).set(recipe);
      }
      if (recipeId) {
        let ingredientslist = ingredients.split(",");
        this.afs
          .doc<Recipe>("/recipes/" + recipeId)
          .update({ title, imageUrl, ingredients: ingredientslist });
      }
    }
  }

  addRecipe(recipe: Recipe, selectedFile?: File) {
    this.addOrUpdataRecipe(null, null, null, null, selectedFile, recipe);
  }
  getRecipe(recipeId: string, recipeObs: Observable<Recipe>) {
    recipeObs = this.afs.doc<Recipe>(`recipes/${recipeId}/`).valueChanges();
    return recipeObs;
  }

  getAllRecipes(): Observable<RecipeId[]> {
    return this.recipes;
  }
  deleteRecipe(recipeId: string) {
    this.afs
      .doc<Recipe>("recipes/" + recipeId)
      .delete()
      .then((res) => {})
      .catch((error) => console.log(`error removing document ${error}`));
  }
  setRecipe(recipeItem: Recipe) {
    this.recipe = { ...recipeItem };
  }
  updateRecipe(
    recipeId: string,
    title,
    imageUrl,
    ingredients: string,
    selectedFile?: File
  ) {
    /*  this.afs
      .doc<Recipe>("/recipes/" + recipeId)
      .update({ title, imageUrl, ingredients: ingredientslist }); */
    this.addOrUpdataRecipe(
      recipeId,
      title,
      imageUrl,
      ingredients,
      selectedFile
    );
  }
}
