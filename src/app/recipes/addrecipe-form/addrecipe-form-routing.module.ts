import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AddrecipeFormPage } from "./addrecipe-form.page";

const routes: Routes = [
  {
    path: "",
    component: AddrecipeFormPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddrecipeFormPageRoutingModule {}
