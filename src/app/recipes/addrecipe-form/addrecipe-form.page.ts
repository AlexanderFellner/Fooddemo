import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { RecipesService } from "../recipes.service";
import { Recipe } from "../recipe.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-addrecipe-form",
  templateUrl: "./addrecipe-form.page.html",
  styleUrls: ["./addrecipe-form.page.scss"],
})
export class AddrecipeFormPage implements OnInit {
  private counter: number = 0;
  constructor(private recipesService: RecipesService, private router: Router) {}

  ngOnInit() {}
  onAddRecipe(form: NgForm) {
    const formprops = form.value;
    console.log(formprops.title);
    console.log(formprops.imageUrl);
    console.log(formprops.ingredients);
    const ingredients = formprops.ingredients;
    const ingredientsarray = ingredients.split(";");

    this.counter = this.recipesService.getAllRecipes().length;
    const newRecipe: Recipe = {
      id: this.counter,
      title: formprops.title,
      imageUrl: formprops.imageUrl,
      ingredients: ingredientsarray,
    };
    this.recipesService.getAllRecipes().push(newRecipe);
    console.log(this.recipesService.getAllRecipes());
    this.router.navigate(["/recipes"]);
  }
  log(x) {
    console.log(x);
  }
}
