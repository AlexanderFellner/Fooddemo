import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth/";
import { AngularFirestore } from "@angular/fire/firestore";
import { User } from "./user.model";
import { Observable } from "rxjs";
import { Router, Route } from "@angular/router";
import { LoginFormPageModule } from "./login-form/login-form.module";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user$: Observable<User>;
  uuid: String;
  constructor(
    private auth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.uuid = user.uid;
        this.afs.doc<User>("users/" + user.uid).set({ email: user.email });
      } else {
      }
    });
    this.user$ = this.auth.authState;
    this.user$.subscribe((user) => {
      if (user) {
        this.router.navigate(["/recipes/"]);
      } else {
      }
    });
  }
  logout() {
    if (this.auth.currentUser != null) {
      this.auth.signOut().then(() => {
        this.router.navigate(["/login"]);
      });
    }
  }
}
