import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdaterecipeFormPage } from './updaterecipe-form.page';

const routes: Routes = [
  {
    path: '',
    component: UpdaterecipeFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdaterecipeFormPageRoutingModule {}
