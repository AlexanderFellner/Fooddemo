import { Component, OnInit } from "@angular/core";
import { RecipesService } from "./recipes.service";
import { Recipe } from "./recipe.model";
import { Router, ActivatedRoute } from "@angular/router";

import { Observable } from "rxjs";
import { DocumentChangeAction } from "@angular/fire/firestore/interfaces";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.page.html",
  styleUrls: ["./recipes.page.scss"],
})
export class RecipesPage implements OnInit {
  //recipes: Recipe[];
  detailView: boolean = false;
  mainView: boolean = true;
  recipe: Recipe;
  recipes: Observable<Recipe[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipesService,
    private router: Router
  ) {}
  back() {
    this.detailView = false;
    this.mainView = true;
  }
  getRecipe(recipeItem: Recipe) {
    this.recipe = { ...recipeItem };
    this.detailView = true;
    this.mainView = false;
  }
  ionViewWillEnter() {
    /*  console.log("ionviewwillenter");
    this.recipes = this.recipeService.getAllRecipes();
    console.log(this.recipes); */
  }

  ngOnInit() {
    this.recipes = this.recipeService.getAllRecipes();
    console.log(this.recipes);
    this.recipes.subscribe((recipes) => {
      console.log(recipes);
    });
  }
  onAddRecipeForm() {
    console.log("addForm");
    this.router.navigate(["./addrecipeform"], {
      relativeTo: this.activatedRoute,
    });
  }
}
