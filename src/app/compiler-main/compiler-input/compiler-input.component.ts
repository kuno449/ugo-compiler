import {Component, HostListener, Input, ViewChild} from '@angular/core';
import {CompileAPIService} from '../../service/compile-api.service';

@Component({
  selector: 'app-compiler-input',
  templateUrl: './compiler-input.component.html',
  styleUrls: ['../compiler-main.component.css']
})
export class CompilerInputComponent {

  public readonly DEFAULT_INDENT = 4;

  @ViewChild('textArea') textArea;
  @Input('panelHeight') panelHeight: number;

  constructor(public compileService: CompileAPIService) { }

  private getValue(): string {
    return this.textArea.nativeElement.value;
  }

  private setValue(text: string) {
    this.textArea.nativeElement.value = text;
  }

  private getSelectionStart(): number {
    return this.textArea.nativeElement.selectionStart;
  }

  private getSelectionEnd(): number {
    return this.textArea.nativeElement.length;
  }

  private insertValue(text: string): number {
    const start = this.getSelectionStart();
    const end = this.getSelectionEnd();
    this.setValue(this.getValue().substr(0, start) + text + this.getValue().substr(start, end));

    return start;
  }

  private getLineBeforeCaret(): string {
    const textBeforeCaret = this.getValue().substr(0, this.getSelectionStart());
    return textBeforeCaret.substr(textBeforeCaret.lastIndexOf("\n") + 1);
  }

  private getLineAfterCaret(): string {
    const textAfterCaret = this.getValue().substr(this.getSelectionStart(), this.getValue().length);
    return textAfterCaret.substr(0, textAfterCaret.indexOf("\n") + 1);
  }

  private static getSpace(count: number) {
    let space: string = '';
    for (let i = 0; i < count; i++) space += " ";
    return space;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent){
    switch (event.key) {
      case 'Tab':
        event.preventDefault();
        const tabStart = this.insertValue(CompilerInputComponent.getSpace(this.DEFAULT_INDENT));
        this.textArea.nativeElement.selectionStart = this.textArea.nativeElement.selectionEnd = tabStart + this.DEFAULT_INDENT;
        break;

      case 'Enter':
        event.preventDefault();
        const lineBeforeCaret = this.getLineBeforeCaret();
        const lineAfterCaret = this.getLineAfterCaret();

        let count = lineBeforeCaret ? lineBeforeCaret.search(/\S|$/) : 0;
        if (lineBeforeCaret.trim().endsWith('{') || lineBeforeCaret.endsWith(':')) {
          count = count + this.DEFAULT_INDENT;
        } else if (lineAfterCaret.trim().startsWith('}')) {
          count = count - this.DEFAULT_INDENT;
        }

        const enterStart = this.insertValue("\n" + CompilerInputComponent.getSpace(count));
        this.textArea.nativeElement.selectionStart = this.textArea.nativeElement.selectionEnd = enterStart + count + 1;
        break;

      default:
        break;
    }
  }
}
