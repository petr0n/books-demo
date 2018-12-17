import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpXhrBackend } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BookComponent } from './book.component';
import { BookListComponent } from './book-list.component';
import { FavoriteDirective } from './favorite.directive';
import { GenreListPipe } from './genre-list.pipe';
import { BookFormComponent } from './book-form.component';
import { BookService } from './book.service';
import { lookupListToken, lookupLists } from './providers';
import { FakeBackend } from './fake-backend';
import { routing } from './app.routing';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    MyDatePickerModule
  ],
  declarations: [
    AppComponent,
    BookComponent,
    BookListComponent,
    FavoriteDirective,
    GenreListPipe,
    BookFormComponent
  ],
  providers: [
    BookService,
    { provide: lookupListToken, useValue: lookupLists },
    { provide: HttpXhrBackend, useClass: FakeBackend }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}