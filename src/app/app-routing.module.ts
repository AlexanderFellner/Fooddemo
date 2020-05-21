import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "",
    redirectTo: "recipes",
    pathMatch: "full",
  },
  {
    path: "recipes",

    children: [
      {
        path: "",
        loadChildren: () =>
          import("./recipes/recipes.module").then((m) => m.RecipesPageModule),
      },
      {
        path: "addrecipeform",
        loadChildren: () =>
          import("./recipes/addrecipe-form/addrecipe-form.module").then(
            (m) => m.AddrecipeFormPageModule
          ),
      },
      {
        path: "updaterecipeform",
        loadChildren: () =>
          import("./recipes/updaterecipe-form/updaterecipe-form.module").then(
            (m) => m.UpdaterecipeFormPageModule
          ),
      },
      {
        path: ":recipeId",
        loadChildren: () =>
          import("./recipes/recipe-detail/recipe-detail.module").then(
            (m) => m.RecipeDetailPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
