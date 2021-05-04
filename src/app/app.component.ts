import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {DatabaseService} from './service/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'UgoCompiler';

  constructor(private _router: Router,
              private dbService: DatabaseService) {
    dbService.getAllPosts();
  }

  public openAboutPage() {
    this._router.navigate(['about']);
  }
}
