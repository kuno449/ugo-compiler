import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UgoCompilerConstants} from "../../ugo-compiler-constants";

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent {

  UgoCompilerConstants = UgoCompilerConstants;

  constructor(private _router: Router) { }

  public backToMain() {
    this._router.navigate(['']);
  }
}
