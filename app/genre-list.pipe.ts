import { Pipe } from '@angular/core';

@Pipe({
  name: 'genreList'
})
export class GenreListPipe {
  transform(books) {
    var genres = [];
    books.forEach(book => {
      if (genres.indexOf(book.genre) <= -1) {
        genres.push(book.genre);
      } 
    });
    return genres.join(', ');
  }
}