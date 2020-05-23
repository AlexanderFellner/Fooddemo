import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { Recipe, RecipeId } from "../recipe.model";
import { RecipesService } from "../recipes.service";
import { AlertController } from "@ionic/angular";
import { AngularFirestoreDocument } from "@angular/fire/firestore/document/document";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.page.html",
  styleUrls: ["./recipe-detail.page.scss"],
})
export class RecipeDetailPage implements OnInit {
  recipe$: Recipe;
  loading = true;
  recipeId: string;
  recipeObs: Observable<Recipe>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,

    private recipeService: RecipesService,
    private router: Router,
    private afs: AngularFirestore
  ) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.recipeId = paramMap.get("recipeId");
      console.log(this.recipeId);
    });
  }

  ionViewDidEnter() {
    this.recipe$ = this.recipeService.getRecipe();
  }
  ionViewWillEnter() {}
  ngOnInit() {
    //this.recipe$ = this.recipeService.getRecipe();
    this.recipeObs = this.afs
      .doc<Recipe>(`recipes/${this.recipeId}/`)
      .valueChanges();
    this.recipeObs.subscribe((recipe) => {
      console.log(recipe);
      this.loading = false;
      this.recipe$ = recipe;
    });
  }
  deleteRecipe(recipeId: number) {
    this.alertController
      .create({
        header: "Are You sure?",
        message: "Do you want to delete this item?",
        buttons: [
          { text: "Cancel", role: "cancel" },
          {
            text: "Okay",
            handler: () => {
              this.recipeService.deleteRecipe(recipeId);
              this.router.navigate(["/recipes"], { replaceUrl: true });
            },
          },
        ],
      })
      .then((alertEl) => alertEl.present());
  }
  goToUpdateForm(recipeId: number) {
    this.router.navigate(["../../updaterecipeform", { recipeId }], {
      relativeTo: this.activatedRoute,
    });
  }
}
