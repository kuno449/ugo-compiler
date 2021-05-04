import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CompilerDTO} from '../model/compiler-dto';

@Injectable({
  providedIn: 'root'
})
export class CompileAPIService {

  readonly API_HOME = 'https://wandbox.org/api';

  public inputCode: string;
  public message: string;

  public isCompiling: boolean = false;
  public readonly LINE_BREAK = '<br><br>';

  constructor(private httpClient: HttpClient) {}

  public compileSourceCode() {

    this.isCompiling = true;

    this.message = 'File compile started.' + this.LINE_BREAK;

    const testCode = {
      "code": this.inputCode,
      "compiler": "openjdk-jdk8u121-b13",
    }

    this.httpClient.post<CompilerDTO>(this.API_HOME + '/compile.json', testCode).toPromise().then(result => {
      if (result.compiler_error) {
        console.log('Compile Error::' + result.compiler_error);
        this.appendMessage(result.compiler_error);
      } else {
        console.log('Message::' + result.program_message);
        this.appendMessage(result.program_message);
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
