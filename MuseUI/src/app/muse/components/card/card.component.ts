import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Job } from '../../models/job';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input()
  job : Job;

  @Input()
  wishData: boolean;

  @Input()
  bookmarkData: boolean;

  @Input()
  showbookmarkData: boolean;

  @Output()
  addToWishList = new EventEmitter();

  @Output()
  deleteFromWishList = new EventEmitter();

  @Output()
  updateBookmark = new EventEmitter();

  constructor(private dialog: MatDialog) { }

  addButtonClick(job) {
    console.log('card component : ', job);
    this.addToWishList.emit(job);
  }
  
  deleteButton(job) {
    this.deleteFromWishList.emit(job);
  }

  addBookmark(job) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { bookmark: job.bookmark },
      hasBackdrop: false
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: ', result);
      if(!result.isFromCancel){
      job.bookmark = result.data;
      this.updateBookmark.emit(job);
      }
    });
  }

  closeDialog(){
    this.dialog.closeAll;
  }

  ngOnInit() {
  }

}
