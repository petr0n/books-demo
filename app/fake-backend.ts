import { HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { HttpBackend } from '@angular/common/http/src/backend';

export class FakeBackend implements HttpBackend {
  handle(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    return new Observable((responseObserver: Observer<HttpResponse<any>>) => {
      let responseOptions = {};
      switch (request.method) {
        case 'GET':
          if (request.urlWithParams.indexOf('bookType=') >= 0 || request.url === 'books') {
            let bookType;
            if (request.urlWithParams.indexOf('?') >= 0) {
              bookType = request.urlWithParams.split('=')[1];
              if (bookType === 'undefined') bookType = '';
            }
            let books;
            if (bookType) {
              books = this._books.filter(book => book.bookType === bookType);
            } else {
              books = this._books;
            }
            let genre;
            if (genre) {
              books = this._books.filter(book => book.genre === genre);
            } else {
              books = this._books;
            }
            responseOptions = {
              body: {books: JSON.parse(JSON.stringify(books))},
              status: 200
            };
          } else {
            let books;
            let id = parseInt(request.url.split('/')[1]);
            books = this._books.filter(book => book.id === id);
            responseOptions = {
              body: JSON.parse(JSON.stringify(books[0])),
              status: 200
            };
          }
          break;
        case 'POST':
          let book = request.body;
          book.id = this._getNewId();
          this._books.push(book);
          responseOptions = {status: 201};
          break;
        case 'DELETE':
          let id = parseInt(request.url.split('/')[1]);
          this._deletebook(id);
          responseOptions = {status: 200};
      }

      const responseObject = new HttpResponse(responseOptions);
      responseObserver.next(responseObject);
      responseObserver.complete();
      return () => {
      };
    });
  }

  _deletebook(id) {
    const book = this._books.find(book => book.id === id);
    const index = this._books.indexOf(book);
    if (index >= 0) {
      this._books.splice(index, 1);
    }
  }

  _markAsRead(id) {
    const book = this._books.find(book => book.id === id);
    const index = this._books.indexOf(book);
    if (index >= 0) {
      this._books.splice(index, 1);
    }
  }

  _getNewId() {
    if (this._books.length > 0) {
      return Math.max.apply(Math, this._books.map(book => book.id)) + 1;
    } else {
      return 1;
    }
  }

  _books = [
    {
      id: 1,
      name: "Dune",
      bookType: "Fiction",
      genre: "Science Fiction",
      year: 2010,
      readOnStart: '3/23/2001',
      readOnFinish: '7/11/2001',
      isFavorite: false
    },
    {
      id: 2,
      name: "Brave New World",
      bookType: "Fiction",
      genre: "Fantasy",
      year: 1980,
      readOnStart: null,
      readOnFinish: null,
      isFavorite: true
    }, {
      id: 3,
      name: "Pet Cemetery",
      bookType: "Fiction",
      genre: "Horror",
      year: 2016,
      readOnStart: null,
      readOnFinish: null,
      isFavorite: false
    }, {
      id: 4,
      name: "Mists of Avalon",
      bookType: "Fiction",
      genre: "Fantasy",
      year: null,
      readOnStart: '3/09/2011',
      readOnFinish: null,
      isFavorite: true
    }, {
      id: 5,
      name: "Hitchhikers Guide to the Galaxy",
      bookType: "Fiction",
      genre: "Humor",
      year: 2015,
      readOnStart: '4/5/1990',
      readOnFinish: '3/3/1990',
      isFavorite: false
    }, {
      id: 6,
      name: "John Adams",
      bookType: "Non-Fiction",
      genre: "History",
      year: 2002,
      readOnStart: '12/12/2011', //dd/mm/yyyy
      readOnFinish: '1/1/2012',
      isFavorite: false
    }
  ];
}
