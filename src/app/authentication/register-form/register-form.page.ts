import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth/";
import { auth } from "firebase/app";

@Component({
  selector: "app-register-form",
  templateUrl: "./register-form.page.html",
  styleUrls: ["./register-form.page.scss"],
})
export class RegisterFormPage implements OnInit {
  email: string;
  password: string;
  constructor(private auth: AngularFireAuth) {}

  ngOnInit() {}
  register() {
    console.log(this.email);
    console.log(this.password);
    this.auth
      .createUserWithEmailAndPassword(this.email, this.password)
      .then((usercred) => console.log(usercred))
      .catch((error) =>
        console.log("an error occurred while registering the user " + error)
      );
  }
}
