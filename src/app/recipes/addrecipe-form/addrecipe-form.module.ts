import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AddrecipeFormPageRoutingModule } from "./addrecipe-form-routing.module";

import { AddrecipeFormPage } from "./addrecipe-form.page";
import { ToolbarComponent } from "../toolbar/toolbar.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddrecipeFormPageRoutingModule,
  ],
  declarations: [AddrecipeFormPage, ToolbarComponent],
})
export class AddrecipeFormPageModule {}
