import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BookService } from './book.service';

@Component({
  selector: 'pk-book-list',
  templateUrl: 'app/book-list.component.html',
  styleUrls: ['app/book-list.component.css']
})
export class BookListComponent {
  bookType = '';
  genre = '';
  books = [];

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(params => {
        let bookType = params['bookType'];
        let genre = params['genre'];
        if(bookType.toLowerCase() === 'all') {
          bookType = '';
        }
        // if(genre.toLowerCase() === 'all') {
        //   genre = '';
        // }
        // genre = '';
        this.getBooks(bookType);
      });
  }

  onBookDelete(book) {
    this.bookService.delete(book)
      .subscribe(() => {
        this.getBooks(this.bookType);
      });
  }

  getBooks(bookType) {
    this.bookType = bookType;
    // this.genre = genre;
    this.bookService.get(bookType)
      .subscribe(books => {
        this.books = books;
      });
  }

  filterBooks(filterVal){ // could be isReading, hasRead, willRead
    switch (filterVal) {
      case 'isReading':
        return this.books.filter(book => book.readOnStart !== null && book.readOnFinish === null);
      case 'hasRead':
        return this.books.filter(book => book.readOnStart !== null && book.readOnFinish !== null);
      case 'willRead':
        return this.books.filter(book => book.readOnStart === null && book.readOnFinish === null);
    }
  }
}
