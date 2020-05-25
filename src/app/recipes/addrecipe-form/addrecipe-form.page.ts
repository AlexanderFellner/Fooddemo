import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { RecipesService } from "../recipes.service";
import { Router } from "@angular/router";
import { AuthService } from "src/app/authentication/auth.service";

@Component({
  selector: "app-addrecipe-form",
  templateUrl: "./addrecipe-form.page.html",
  styleUrls: ["./addrecipe-form.page.scss"],
})
export class AddrecipeFormPage implements OnInit {
  ingredients: string;
  imageUrl: string;
  title: string;
  selectedFile: File;
  titleerror = false;
  imageUrlerror = false;
  ingredientserror = false;
  constructor(
    private authService: AuthService,
    private recipesService: RecipesService,
    private router: Router
  ) {}

  ngOnInit() {}
  onAddRecipe(form: NgForm) {
    const formprops = form.value;
    const ingredients = formprops.ingredients;

    if (formprops.title && formprops.imageUrl && formprops.ingredients) {
      const ingredientsarray = ingredients.split(",");
      this.recipesService.addRecipe(
        {
          title: formprops.title,
          imageUrl: formprops.imageUrl,
          ingredients: ingredientsarray,
          uuid: this.authService.uuid.toString(),
        },
        this.selectedFile
      );
      this.router.navigate(["/recipes"]);
    }
    if (!formprops.title) {
      this.titleerror = true;
      this.title = "title is required";
    }
    if (!formprops.imageUrl) {
      this.imageUrlerror = true;
      this.imageUrl = "imageUrl is required";
    }
    if (!formprops.ingredients) {
      this.ingredientserror = true;
      this.ingredients = "ingredients are required";
    }
  }
  logout() {
    this.authService.logout();
  }
  /* selectFile(event) {
    this.selectedFile = event.target.files[0];
    this.imageUrl = this.selectedFile.name;
  } */
  upload(fileInput) {
    fileInput.click();
  }
  onUploaded(event) {
    this.selectedFile = event;
    this.imageUrl = event.name;
  }
}
