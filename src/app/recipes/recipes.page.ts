import { Component, OnInit } from "@angular/core";
import { RecipesService } from "./recipes.service";
import { Recipe } from "./recipe.model";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../authentication/auth.service";

import { Observable } from "rxjs";
import { DocumentChangeAction } from "@angular/fire/firestore/interfaces";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.page.html",
  styleUrls: ["./recipes.page.scss"],
})
export class RecipesPage implements OnInit {
  recipe: Recipe;
  recipes: Observable<Recipe[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private recipeService: RecipesService,
    private router: Router
  ) {}

  ionViewWillEnter() {}

  ngOnInit() {
    this.recipes = this.recipeService.getAllRecipes();
  }
  onAddRecipeForm() {
    this.router.navigate(["./addrecipeform"], {
      relativeTo: this.activatedRoute,
    });
  }
  logout() {
    this.authService.logout();
  }
}
