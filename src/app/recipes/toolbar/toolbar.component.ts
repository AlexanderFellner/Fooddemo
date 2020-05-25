import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AuthService } from "src/app/authentication/auth.service";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent implements OnInit {
  @Input() title;
  @Output() uploaded = new EventEmitter<File>();
  selectedFile: File;
  imageUrl: string;
  constructor(private authService: AuthService) {}

  ngOnInit() {}
  selectFile(event) {
    this.selectedFile = event.target.files[0];
    this.uploaded.emit(this.selectedFile);
    this.imageUrl = this.selectedFile.name;
  }
  upload(fileInput) {
    fileInput.click();
  }
  logout() {
    this.authService.logout();
  }
}
