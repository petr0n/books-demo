import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { BookService } from './book.service';
import { lookupListToken } from './providers';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';

@Component({
  selector: 'pk-book-form',
  templateUrl: 'app/book-form.component.html',
  styleUrls: ['app/book-form.component.css']
})
export class BookFormComponent {

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
  };

  form;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    @Inject(lookupListToken) public lookupLists,
    private router: Router) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      bookType: this.formBuilder.control(''),
      name: this.formBuilder.control('', Validators.compose([
        Validators.required,
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      genre: this.formBuilder.control(''),
      year: this.formBuilder.control('', this.yearValidator),
      readOnStart: this.formBuilder.control(null, Validators.required),
      readOnFinish: this.formBuilder.control(null)
    });
  }

  yearValidator(control) {
    if (control.value.trim().length === 0) {
      return null;
    }
    let year = parseInt(control.value);
    let minYear = 1800;
    let maxYear = 2500;
    if (year >= minYear && year <= maxYear) {
      return null;
    } else {
      return {
        'year': {
          min: minYear,
          max: maxYear
        }
      };
    }
  }

  onSubmit(book) {
    this.bookService.add(book)
      .subscribe(() => {
        this.router.navigate(['/', book.bookType]);
      });
  }

  setDate(): void {
    let date = new Date();
    this.form.patchValue([{
      readOnStart: {
        date:  date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
        //   month: date.getMonth() + 1,
        //   day: date.getDate()}
        // date: {
        //   year: date.getFullYear(),
        //   month: date.getMonth() + 1,
        //   day: date.getDate()}
      },
      readOnFinish: {
        date:  date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
        // date: {
        //   year: date.getFullYear(),
        //   month: date.getMonth() + 1,
        //   day: date.getDate()}
        // }
      }
    }]);
  }

  clearDate(): void {
      this.form.patchValue([{readOnStart: null}, {readOnFinish: null}]);
  }

  onDateChanged(event: IMyDateModel) {
    // console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
    console.log(this.form.value);
  }

}
