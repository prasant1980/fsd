import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { UserService } from '../../services/user.service';
import { Job } from '../../models/job';
import { Company } from '../../models/company';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css']
})
export class CardContainerComponent implements OnInit {
  jobs: Array<Job>;
  job: Job;
  company: Company;
  statusCode: number;
  errorStatus: string;
  userName: string;
  name: string;
  searchJobs: Array<Job>;
  favoriteJobs: Array<Job>;
  bookmarkJobs: Array<Job>;

  length: number = 0;
  pageSize: number = 20;  //displaying three cards each row
  pageSizeOptions: number[] = [20];

  constructor(private jobService: JobService, private routes: ActivatedRoute, private matSnackBar: MatSnackBar, private userService: UserService) {
    this.jobs = [];
    this.userName = this.userService.GetUserId();
    this.favoriteJobs = [];
    this.bookmarkJobs = [];
  }

  ngOnInit() {
    this.jobService.getAllJobData(1).subscribe(allJobData => {
      console.log('Favorites data :', allJobData[0]);
      this.favoriteJobs = allJobData[0];
      console.log('Bookmark data :', allJobData[1]);
      this.bookmarkJobs = allJobData[1];
      console.log('All Job data :', allJobData[2]);
      this.length = allJobData[2].total;
      allJobData[2].results.forEach(targetData => {
        this.job = targetData;
        this.job.url = targetData["refs"]["landing_page"];
        this.job.locations = targetData["locations"].map(a => a.name);
        console.log("location=" + this.job.locations);
        this.job.jobCreatedBy = this.userName;
        this.job.jobCreationDate = new Date();
        this.favoriteJobs.forEach(element => {
          if (element.id === this.job.id) {
            this.job.isFavorite = true;
          }
        });
        this.bookmarkJobs.forEach(bookmarkElement => {
          if (bookmarkElement.id === this.job.id) {
            this.job.bookmark = bookmarkElement.bookmark;
          }
        });
        this.jobs.push(this.job);
        this.searchJobs = this.jobs;
      });
    });

  }

  OnPageChange(event: PageEvent){
    let pageToFetch = event.pageIndex + 1;
    console.log("pageToFetch : " + pageToFetch);
    this.jobService.getPageJobData(pageToFetch).subscribe(data => { 
      this.jobs.length=0;
      this.searchJobs.length=0;
      this.length = data["total"];
      data["results"].forEach(targetData => {
        this.job = targetData;
        this.job.url = targetData["refs"]["landing_page"];
        this.job.locations = targetData["locations"].map(a => a.name);
        this.job.jobCreatedBy = this.userName;
        this.job.jobCreationDate = new Date();
        this.favoriteJobs.forEach(element => {
          if (element.id === this.job.id) {
            this.job.isFavorite = true;
          }
        });
        this.bookmarkJobs.forEach(bookmarkElement => {
          if (bookmarkElement.id === this.job.id) {
            this.job.bookmark = bookmarkElement.bookmark;
          }
        });
        this.jobs.push(this.job);
        this.searchJobs = this.jobs;
      });
    });
  }

  addToWishList(job) {
    console.log('Inside the card container component for favorite: ', job);
    this.jobService.addToWishList(job).subscribe(data => {
      console.log(data);
      this.statusCode = data.status;
      if (this.statusCode === 201) {
        console.log("Success : ", this.statusCode);
        this.matSnackBar.open("Job Successfully Added !!!", " ", {
          duration: 1000
        });
      }
    },
      error => {
        this.errorStatus = `${error.status}`;
        const errormsg = `${error.error.message}`;
        this.statusCode = parseInt(this.errorStatus, 10);
        if (this.statusCode === 409) {
          this.matSnackBar.open(errormsg, "", {
            duration: 1000
          });
          this.statusCode = 0;
        }
      });
  }

  updateBookmark(job) {
    console.log("In update bookmark");
    this.jobService.updateBookmark(job).subscribe(data => {
      console.log('data', data);
      this.matSnackBar.open("Successfully updated", '', {
        duration: 1000
      })
    },
      error => {
        console.log('error', error);
      });
  }

  onKey(event: any) {
    this.name = event.target.value;
    console.log("job name : ", this.name);
    const result = this.searchJobs.filter(job => {
      return job.name.match(this.name);
    });
    console.log(result, "Filtered data");
    this.jobs = result;
  }

}
