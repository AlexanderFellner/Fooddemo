import { Component, OnInit } from "@angular/core";

import { User } from "../user.model";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth/";
import { AuthService } from "../auth.service";
import { AlertController } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.page.html",
  styleUrls: ["./login-form.page.scss"],
})
export class LoginFormPage implements OnInit {
  email: string;
  password: string;
  user$: Observable<User>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private auth: AngularFireAuth,
    private authService: AuthService,
    private alertController: AlertController
  ) {}
  ionViewDidEnter() {
    console.log("ionviewdidenter in login page");
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const notloggedIn = paramMap.get("notloggedIn");
      if (notloggedIn != null && !!notloggedIn == true) {
        this.alertController
          .create({
            header: "Access denied !!",
            message: "You are not logged in !!.Please log in first.",
            buttons: [{ text: "Okay", role: "cancel" }],
          })
          .then((alert) => alert.present());
      }
    });
  }
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const notloggedIn = paramMap.get("notloggedIn");
      if (notloggedIn != null && !!notloggedIn == true) {
        this.alertController
          .create({
            header: "Access denied !!",
            message: "You are not logged in !!.Please log in first.",
            buttons: ["Okay"],
          })
          .then((alert) => alert.present());
      }
    });
  }
  login() {
    console.log(this.email);
    console.log(this.password);
    this.auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then((usercred) => {})
      .catch((error) => console.log(error.message));
  }
}
