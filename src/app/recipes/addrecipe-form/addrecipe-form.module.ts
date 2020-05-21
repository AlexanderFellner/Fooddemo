import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddrecipeFormPageRoutingModule } from './addrecipe-form-routing.module';

import { AddrecipeFormPage } from './addrecipe-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddrecipeFormPageRoutingModule
  ],
  declarations: [AddrecipeFormPage]
})
export class AddrecipeFormPageModule {}
