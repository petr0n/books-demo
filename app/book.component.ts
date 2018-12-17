import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pk-book',
  templateUrl: 'app/book.component.html',
  styleUrls: ['app/book.component.css']
})
export class BookComponent {
  @Input() book;
  @Output() delete = new EventEmitter();
  @Output() markAsRead = new EventEmitter();
  @Output() markAsStarted = new EventEmitter();

  onDelete() {
    this.delete.emit(this.book);
  }
  onMarkAsRead(){
    this.markAsRead.emit(this.book);
  }
  onMarkAsStarted(){
    this.markAsStarted.emit(this.book);
  }
}
