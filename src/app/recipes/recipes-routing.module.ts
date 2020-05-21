import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesPage } from './recipes.page';

const routes: Routes = [
  {
    path: '',
    component: RecipesPage
  },
  {
    path: 'recipe-detail',
    loadChildren: () => import('./recipe-detail/recipe-detail.module').then( m => m.RecipeDetailPageModule)
  },
  {
    path: 'addrecipe-form',
    loadChildren: () => import('./addrecipe-form/addrecipe-form.module').then( m => m.AddrecipeFormPageModule)
  },
  {
    path: 'updaterecipe-form',
    loadChildren: () => import('./updaterecipe-form/updaterecipe-form.module').then( m => m.UpdaterecipeFormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesPageRoutingModule {}
