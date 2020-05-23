import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Recipe } from "../recipe.model";
import { RecipesService } from "../recipes.service";

@Component({
  selector: "app-updaterecipe-form",
  templateUrl: "./updaterecipe-form.page.html",
  styleUrls: ["./updaterecipe-form.page.scss"],
})
export class UpdaterecipeFormPage implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipesService,
    private router: Router
  ) {}
  private recipeId: number;
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      console.log(paramMap.get("recipeId"));
      this.recipeId = +paramMap.get("recipeId");
    });
  }
  onUpdateRecipe(form: NgForm) {
    const props = form.value;
    const ingredients = props.ingredients;
    const ingredientsarray = ingredients.split(";");
    /*  let oldrecipe: Recipe = this.recipeService
      .getAllRecipes()
      .find((recipe, index) => {
        return recipe.id === this.recipeId;
      });
    oldrecipe.title = props.title;
    oldrecipe.imageUrl = props.imageUrl;
    oldrecipe.ingredients = ingredientsarray; */
    this.router.navigate(["/recipes"]);
  }
}
