import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Job } from '../../models/job';
import { JobService } from '../../services/job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-wishing-list',
  templateUrl: './wishing-list.component.html',
  styleUrls: ['./wishing-list.component.css']
})
export class WishingListComponent implements OnInit {

  jobs: Array<Job> = [];
  statusCode: number;
  wishData = true;
  bookmarkData = true;

  pagedList: Job[]= [];
  length: number = 0;
  pageSize: number = 20;  //displaying three cards each row
  pageSizeOptions: number[] = [20];

  constructor(private jobService: JobService, private route: ActivatedRoute, private userService: UserService, private router: Router, private snackBar: MatSnackBar) { 
    this.jobs = [];
  }

  ngOnInit() {
    console.log("inside wish list");
    this.loadWishListJobs();
  }
  
  loadWishListJobs(){
    this.jobs = []; 
    const message = "WishList is empty";
    this.jobService.getAllJobsFromWishList().subscribe(data => {

      data.forEach(targetData => {
        if (targetData.jobCreatedBy === this.userService.GetUserId()) {
          this.jobs.push(targetData);
        }
      });
      if (data.length === 0 || this.jobs.length === 0) {
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

  deleteFromWishList(job) {
    this.jobService.deleteJobFromWishList(job).subscribe(data => {
      console.log("deleted", data);
      const index = this.jobs.indexOf(job);
      this.jobs.splice(index, 1);
      this.snackBar.open(data, " ", {
        duration: 1000,
        verticalPosition:'top'
      });
      this.loadWishListJobs();
    });
    return this.jobs;
  }

  updateBookmark(job) {
    console.log("In update bookmark");
    this.jobService.updateBookmark(job).subscribe(data => {
      console.log('data', data);
      this.snackBar.open("Successfully updated", '', {
        duration: 1000,
        verticalPosition:'top'
      })
    },
      error => {
        console.log('error', error);
      });
  }
}
