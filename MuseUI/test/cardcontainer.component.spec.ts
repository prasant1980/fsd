import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from '../src/app/muse/services/authentication.service';
import { Observable } from 'rxjs';
import { CardContainerComponent } from 'src/app/muse/components/card-container/card-container.component';
import { JobService } from 'src/app/muse/services/job.service';


const testConfig = {
  gifmodel: [{
      id: 1,
      name: 'Project Manager',
    },
    {
      id: 2,
      title: 'UI Developer',
    }]
};

describe('DashboardComponent', () => {
  let component: CardContainerComponent;
  let fixture: ComponentFixture<CardContainerComponent>;
  let jobService: any;
  let spyFetchjobFromServer: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardContainerComponent ],
      imports: [ HttpClientModule ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      JobService,
      AuthenticationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    jobService = TestBed.get(JobService);
    spyFetchjobFromServer = spyOn(jobService, 'fetchJobFromServer').and.returnValue(Observable.create(testConfig.gifmodel));
  });

  it('should create', () => {
    fixture = TestBed.createComponent(CardContainerComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('fetchJobFromServer should be called whenever DashboardComponent is rendered', () => {
    fixture = TestBed.createComponent(CardContainerComponent);
    component = fixture.componentInstance;
    expect(jobService.fetchJobFromServer).toHaveBeenCalled();
  });
});
