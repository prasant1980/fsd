import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Job} from '../../models/job';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  bookmark: string;
  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Job) {
    this.bookmark = data.bookmark;
   }

  ngOnInit() {
  }

  updateBookmark() {
    this.dialogRef.close({data:this.bookmark,isFromCancel:false});
  }

  onClose() {
    this.dialogRef.close({data:this.bookmark,isFromCancel:true});
  }

}
