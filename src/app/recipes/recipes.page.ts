import { Component, OnInit } from "@angular/core";
import { RecipesService } from "./recipes.service";
import { Recipe } from "./recipe.model";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.page.html",
  styleUrls: ["./recipes.page.scss"],
})
export class RecipesPage implements OnInit {
  recipes: Recipe[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipesService,
    private router: Router
  ) {}
  ionViewWillEnter() {
    console.log("ionviewwillenter");
    this.recipes = this.recipeService.getAllRecipes();
    console.log(this.recipes);
  }

  ngOnInit() {
    this.recipes = this.recipeService.getAllRecipes();
    console.log(this.recipes);
  }
  onAddRecipeForm() {
    console.log("addForm");
    this.router.navigate(["./addrecipeform"], {
      relativeTo: this.activatedRoute,
    });
  }
}
