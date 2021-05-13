import {Component} from '@angular/core';
import {DatabaseService} from '../service/database.service';
import {CodeSnippets} from '../model/code-snippets';
import {CompileAPIService} from '../service/compile-api.service';
import {UgoCompilerConstants} from "../../ugo-compiler-constants";

@Component({
  selector: 'app-code-selection',
  templateUrl: './code-selection.component.html',
  styleUrls: ['./code-selection.component.css']
})
export class CodeSelectionComponent {

  UgoCompilerConstants = UgoCompilerConstants;

  public selectedSnippets: CodeSnippets;

  constructor(private _compileApiService: CompileAPIService,
              public dbService: DatabaseService) {
  }

  public changeSelection(event: CodeSnippets) {
    this._compileApiService.inputCode = event.content;
  }
}
