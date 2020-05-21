import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Recipe } from "../recipe.model";
import { RecipesService } from "../recipes.service";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.page.html",
  styleUrls: ["./recipe-detail.page.scss"],
})
export class RecipeDetailPage implements OnInit {
  recipe: Recipe;
  constructor(
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,

    private recipeService: RecipesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((data) => {
      if (!data.has("recipeId")) {
        this.router.navigate(["/recipes"]);
        return;
      }
      this.recipe = this.recipeService.getRecipe(+data.get("recipeId"));
      console.log(data.get("recipeId"));
      console.log(this.recipe);
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
              this.recipeService.deleteRecipe(this.recipe.id);
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
