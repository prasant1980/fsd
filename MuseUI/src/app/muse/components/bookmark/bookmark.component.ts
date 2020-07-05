import { Component, OnInit } from '@angular/core';
import { Job } from '../../models/job';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobService } from '../../services/job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {
  jobs: Array<Job>;
  statusCode: number;
  errorStatus: string;
  bookmarkData = true;
  showbookmarkData = true;

  pagedList: Job[]= [];
  length: number = 0;
  pageSize: number = 20;  //displaying three cards each row
  pageSizeOptions: number[] = [20];

  constructor(private jobService: JobService, private route: ActivatedRoute, private userService:UserService, private router: Router, private snackBar: MatSnackBar) { 
    this.jobs=[];
  }

  ngOnInit() {
    console.log("inside bookmark list");
    this.loadBookmarkJobs();
  }

  loadBookmarkJobs(){
    const message = "Bookmark is empty";
    this.jobs = []; 
    this.jobService.getAllJobsFromBookmark().subscribe(data => {
      data.forEach(targetData => {
      if(targetData.jobCreatedBy===this.userService.GetUserId() && (targetData.bookmark!=null || targetData.bookmark==="")){
        this.jobs.push(targetData);
      }
      });
      if (data.length === 0 || this.jobs.length ===0) {
        this.snackBar.open(message, " ", {
          duration: 1000,
          verticalPosition:'top'
        });
      }
      this.pagedList = this.jobs.slice(0,20);
      this.length = this.jobs.length;
    });
  }

  OnPageChange(event: PageEvent){
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.length){
      endIndex = this.length;
    }
    this.pagedList = this.jobs.slice(startIndex, endIndex);
  }

  updateBookmark(job) {
    console.log("In update bookmark");
    this.jobService.updateBookmark(job).subscribe(data => {
      console.log('data', data);
      this.snackBar.open("Successfully updated", '' , {
        duration: 1000,
        verticalPosition:'top'
      });
      this.loadBookmarkJobs();
  },
  error =>{
    console.log('error', error);
  });
  }

  addToWishList(job) {
    console.log('Inside the card container component for favorite: ', job);
    this.jobService.addToWishList(job).subscribe(data => {
      console.log(data);
      this.statusCode = data.status;
      if (this.statusCode === 201) {
        console.log("Success : ", this.statusCode);
        this.snackBar.open("Job Successfully Added !!!", " ", {
          duration: 1000,
          verticalPosition:'top'
        });
      }
    },
      error => {
        this.errorStatus = `${error.status}`;
        const errormsg = `${error.error.message}`;
        this.statusCode = parseInt(this.errorStatus, 10);
        if (this.statusCode === 409) {
          this.snackBar.open(errormsg, "", {
            duration: 1000,
            verticalPosition:'top'
          });
          this.statusCode = 0;
        }
      });
  }

}
