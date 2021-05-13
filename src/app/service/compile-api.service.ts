import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CompilerDTO} from '../model/compiler-dto';

@Injectable({
  providedIn: 'root'
})
export class CompileAPIService {

  readonly API_HOME = 'https://wandbox.org/api';
  readonly DEFAULT_COMPILER = 'openjdk-jdk8u121-b13';

  public inputCode: string;
  public message: string;

  public isCompiling: boolean = false;
  public readonly LINE_BREAK = '<br><br>';

  constructor(private httpClient: HttpClient) {}

  public compileSourceCode() {

    this.isCompiling = true;

    this.message = 'File compile started.' + '<br>';
    this.appendMessage('Compiler >>> ' + this.DEFAULT_COMPILER);
    const testCode = {
      "code": this.inputCode,
      "compiler": this.DEFAULT_COMPILER,
    }

    this.httpClient.post<CompilerDTO>(this.API_HOME + '/compile.json', testCode).toPromise().then(result => {
      if (result.compiler_error) {
        console.log('Compile Error::' + result.compiler_error);
        this.appendMessage(result.compiler_error);
      } else {
        const msg = result.program_message.split('\n').join('<br>');
        console.log('Message::' + msg);
        this.appendMessage(msg);
      }
      this.appendMessage('Received compile result.');
      this.isCompiling = false;
    }).catch(error => {
      this.appendMessage(error.message);
      console.log('Error::' + error.message);
      this.isCompiling = false;
    });
  }

  private appendMessage(msg: string) {
    this.message = this.message + msg + this.LINE_BREAK;
  }
}
