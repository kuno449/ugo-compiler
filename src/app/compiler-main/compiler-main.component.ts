import {Component, HostListener} from '@angular/core';
import {CompileAPIService} from '../service/compile-api.service';
import {DatabaseService} from '../service/database.service';
import {ActivatedRoute} from "@angular/router";
import {UgoCompilerConstants} from "../../ugo-compiler-constants";

@Component({
  selector: 'app-compiler-main',
  templateUrl: './compiler-main.component.html',
  styleUrls: ['./compiler-main.component.css']
})
export class CompilerMainComponent {

  public readonly HEADER_HEIGHT = 235;

  public panelHeight: number;

  constructor(private route: ActivatedRoute,
              public compileService: CompileAPIService,
              private dbService: DatabaseService) {
    this.getScreenSize();

    if (UgoCompilerConstants.CODE_SELECTION) {
      dbService.getAllPosts().then(() => {
        const postName = this.route.snapshot.queryParamMap.get('post');
        if (postName) {
          const snippet = dbService.snippets.find(sni => sni.postName === postName);
          if (snippet) {
            this.compileService.inputCode = snippet.content;
          } else {
            console.log('Could not find post name ' + postName);
          }
        }
      }).catch(error => console.log('Unknown error occurred. ' + error));
    }
  }

  compile() {
    this.compileService.compileSourceCode();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.panelHeight = window.innerHeight - this.HEADER_HEIGHT;
  }
}
