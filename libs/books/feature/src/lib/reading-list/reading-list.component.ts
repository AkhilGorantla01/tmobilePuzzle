import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, finishBookReadingList, removeFromReadingList, ReadingListBook, addToReadingList, getAllBooks } from '@tmo/books/data-access';
import { Book, ReadingListItem } from '@tmo/shared/models';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);
  books: ReadingListBook[];
  readingItems: ReadingListItem[];


  constructor(private readonly store: Store,
    private _snackBar: MatSnackBar) {}

    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action);
    }
    ngOnInit(): void {
      this.store.select(getAllBooks).subscribe(books => {
        this.books = books;
      });

      this.store.select(getReadingList).subscribe(readingList => {
        this.readingItems = readingList;
      });
    }
  removeFromReadingList(book: Book) {
    const item = this.readingItems.filter(x=> x.bookId === book.id)[0];
    this.store.dispatch(removeFromReadingList( {item} ));
    const snackBarRef = this._snackBar.open("Removed from  Reading List","Undo", { duration: 3000 });
    snackBarRef.onAction().subscribe(()=>this.store.dispatch(addToReadingList({ book })))    
   }

  finishFromReadingList(test:ReadingListItem) {
    const current_date: Date = new Date();
    const item : ReadingListItem = {bookId:test.bookId,...test};
    item.finished = true;
    item.finishedDate =current_date.toISOString();
    this.store.dispatch(finishBookReadingList({item} ));
  }
 
}