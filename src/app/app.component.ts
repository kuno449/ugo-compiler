import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {DatabaseService} from './service/database.service';
import {UgoCompilerConstants} from "../ugo-compiler-constants";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'UgoCompiler';

  constructor(private _router: Router,
              private dbService: DatabaseService) {
    if(UgoCompilerConstants.CODE_SELECTION) dbService.getAllPosts();
  }

  public openAboutPage() {
    this._router.navigate(['about']);
  }
}
