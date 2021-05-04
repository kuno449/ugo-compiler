import {Component, Input} from '@angular/core';
import {CompileAPIService} from '../../service/compile-api.service';

@Component({
  selector: 'app-compiler-result',
  templateUrl: './compiler-result.component.html',
  styleUrls: ['../compiler-main.component.css']
})
export class CompilerResultComponent {

  @Input('panelHeight') panelHeight: number;

  constructor(public compileApiService: CompileAPIService) { }

  ngOnInit(): void {
  }

}
