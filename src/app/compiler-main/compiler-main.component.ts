import {Component, HostListener} from '@angular/core';
import {CompileAPIService} from '../service/compile-api.service';
import {DatabaseService} from '../service/database.service';

@Component({
  selector: 'app-compiler-main',
  templateUrl: './compiler-main.component.html',
  styleUrls: ['./compiler-main.component.css']
})
export class CompilerMainComponent {

  public readonly HEADER_HEIGHT = 235;

  public panelHeight: number;

  constructor(public compileService: CompileAPIService,
              private dbService: DatabaseService) {
    this.getScreenSize();
  }

  compile() {
    this.compileService.compileSourceCode();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.panelHeight = window.innerHeight - this.HEADER_HEIGHT;
  }
}
