import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { UpdaterecipeFormPageRoutingModule } from "./updaterecipe-form-routing.module";

import { UpdaterecipeFormPage } from "./updaterecipe-form.page";
import { ToolbarComponent } from "../toolbar/toolbar.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdaterecipeFormPageRoutingModule,
  ],
  declarations: [UpdaterecipeFormPage, ToolbarComponent],
})
export class UpdaterecipeFormPageModule {}
