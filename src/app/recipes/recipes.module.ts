import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { RecipesPageRoutingModule } from "./recipes-routing.module";

/* firebase imports */
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { RecipesPage } from "./recipes.page";
import { RecipeItemComponent } from "./recipe-item/recipe-item.component";
import { environment } from "src/environments/environment";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipesPageRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  declarations: [RecipesPage, RecipeItemComponent],
})
export class RecipesPageModule {}
