import { Component, OnInit, ElementRef } from "@angular/core";
import { NgForm, NgControl, FormControl } from "@angular/forms";
import { RecipesService } from "../recipes.service";
import { Recipe } from "../recipe.model";
import { Router } from "@angular/router";
import { AuthService } from "src/app/authentication/auth.service";
import { IonInput } from "@ionic/angular";
import { InterpolationConfig } from "@angular/compiler";
import { AngularFireStorage } from "@angular/fire/storage";

@Component({
  selector: "app-addrecipe-form",
  templateUrl: "./addrecipe-form.page.html",
  styleUrls: ["./addrecipe-form.page.scss"],
})
export class AddrecipeFormPage implements OnInit {
  private counter: number = 0;
  imageUrl: string;
  selectedFile: File;
  constructor(
    private storage: AngularFireStorage,
    private authService: AuthService,
    private recipesService: RecipesService,
    private router: Router,
    private eleref: ElementRef
  ) {}

  ngOnInit() {}
  onAddRecipe(form: NgForm) {
    const formprops = form.value;
    console.log(formprops.title);
    console.log(formprops.imageUrl);
    console.log(formprops.ingredients);
    const ingredients = formprops.ingredients;
    const ingredientsarray = ingredients.split(",");
    //console.log(this.selectedFile);
    if (formprops.title && formprops.imageUrl && formprops.ingredients) {
      console.log("in onaddrecipe formprops");
      this.recipesService.addRecipe(
        {
          // id: this.counter,
          title: formprops.title,
          imageUrl: formprops.imageUrl,
          ingredients: ingredientsarray,
          uuid: this.authService.uuid.toString(),
        },
        this.selectedFile
      );
    }

    //console.log(this.recipesService.getAllRecipes());
    this.router.navigate(["/recipes"]);
  }
  log(x) {
    console.log(x);
  }
  logout() {
    this.authService.logout();
  }
  selectFile(event) {
    //console.log(<File>event.target.files[0]);
    this.selectedFile = event.target.files[0];
    this.imageUrl = this.selectedFile.name;

    /* console.log(this.selectedFile);
    const storageref = this.storage.ref("images");
    const storagerefchild = storageref.child(this.selectedFile.name);
    storagerefchild.put(this.selectedFile).then((uploadtask) => {
      storagerefchild.getDownloadURL().subscribe((imageUrl) => {
        // this.imageUrl = imageUrl;
        console.log("in getdownloadurl");
        console.log(imageUrl);
      });
    });
    //   .catch((error) => console.log(error));

    const metadata = storageref.getMetadata(); */
    // metadata.subscribe((metadata) => console.log(metadata));
  }
  upload(fileInput) {
    /*  let smallBox = this.eleref.nativeElement.querySelector("#fileInput"); // parens
    smallBox.dispatchEvent(new Event("click")); */
    fileInput.click();
  }
}
