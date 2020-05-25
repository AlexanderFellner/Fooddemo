import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Recipe } from "../recipe.model";
import { RecipesService } from "../recipes.service";
import { AuthService } from "src/app/authentication/auth.service";

@Component({
  selector: "app-updaterecipe-form",
  templateUrl: "./updaterecipe-form.page.html",
  styleUrls: ["./updaterecipe-form.page.scss"],
})
export class UpdaterecipeFormPage implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private recipeService: RecipesService,
    private router: Router
  ) {}
  recipeId: string;
  title;
  imageUrl;
  ingredients;
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      console.log(paramMap.get("recipeId"));
      this.recipeId = paramMap.get("recipeId");
      this.title = paramMap.get("title");
      console.log(paramMap.get("title"));
      this.imageUrl = paramMap.get("imageUrl");
      console.log(paramMap.get("imageUrl"));
      this.ingredients = paramMap.get("ingredients");
      console.log(paramMap.get("ingredients"));
    });
  }
  onUpdateRecipe(form: NgForm) {
    const props = form.value;
    const ingredients = props.ingredients;
    this.recipeService.updateRecipe(
      this.recipeId,
      this.title,
      this.imageUrl,
      this.ingredients
    );
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
  logout() {
    this.authService.logout();
  }
}
