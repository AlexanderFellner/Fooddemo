import { Component, OnInit, Input } from "@angular/core";
import { Recipe, RecipeId } from "../recipe.model";
import { RecipesService } from "../recipes.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-recipe-item",
  templateUrl: "./recipe-item.component.html",
  styleUrls: ["./recipe-item.component.scss"],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipeItem: RecipeId;

  constructor(private recipeService: RecipesService, private route: Router) {}
  setRecipe() {
    if (this.recipeItem != null) {
      this.recipeService.setRecipe(this.recipeItem);
      this.route.navigate([`../recipes/${this.recipeItem.id}`]);
    }
  }

  ngOnInit() {}
}
