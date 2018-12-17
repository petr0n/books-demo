import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class BookService {
  constructor(private http: HttpClient) {}

  get(bookType) {
    let getOptions = {
      params: { bookType }
    };
    return this.http.get<BooksResponse>('books', getOptions)
      .pipe(
        map((response: BooksResponse) => {
          return response.books;
        })
      );
  }
  
  add(book) {
    return this.http.post('books', book);
  }
  
  delete(book) {
    return this.http.delete(`books/${book.id}`);
  }
}

interface BooksResponse {
  books: Book[]
}

interface Book {
  id: number;
  name: string;
  bookType: string;
  genre: string;
  year: number;
  readOnStart: number;
  readOnFinish: number;
  isFavorite: boolean;
}