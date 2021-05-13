import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CodeSnippets, WpPostDTO} from '../model/code-snippets';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  public snippets: Array<CodeSnippets> = [];

  constructor(private http: HttpClient) {
  }

  public getAllPosts(): Promise<void> {
    return new Promise<void>(resolve =>
      this.http.get('https://ugo.tokyo/get-all-posts.php').subscribe((dtos: Array<WpPostDTO>) => {
      dtos.forEach(dto => {
        this.snippets.push({
          postTitle: dto.post_title,
          postName: dto.post_name,
          content: dto.post_content
        } as CodeSnippets)
      })
      resolve();
    }));
  }
}
