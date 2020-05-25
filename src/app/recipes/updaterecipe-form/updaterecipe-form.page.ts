import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { RecipesService } from "../recipes.service";
import { AuthService } from "src/app/authentication/auth.service";

@Component({
  selector: "app-updaterecipe-form",
  templateUrl: "./updaterecipe-form.page.html",
  styleUrls: ["./updaterecipe-form.page.scss"],
})
export class UpdaterecipeFormPage implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private recipeService: RecipesService,
    private router: Router
  ) {}
  recipeId: string;
  title;
  titleerror;
  ingredientserror;
  imageUrl;
  imageUrlerror;
  ingredients;
  selectedFile: File;
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.recipeId = paramMap.get("recipeId");
      this.title = paramMap.get("title");
      this.imageUrl = paramMap.get("imageUrl");
      this.ingredients = paramMap.get("ingredients");
    });
  }
  onUpdateRecipe(form: NgForm) {
    if (this.title && this.imageUrl && this.ingredients) {
      this.recipeService.updateRecipe(
        this.recipeId,
        this.title,
        this.imageUrl,
        this.ingredients,
        this.selectedFile
      );
      this.router.navigate(["/recipes"]);
    }
    if (!this.title) {
      this.titleerror = true;
      this.title = "title is required";
    }
    if (!this.imageUrl) {
      this.imageUrlerror = true;
      this.imageUrl = "imageUrl is required";
    }
    if (!this.ingredients) {
      this.ingredientserror = true;
      this.ingredients = "ingredients are required";
    }
  }
  logout() {
    this.authService.logout();
  }
  /*  selectFile(event) {
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
