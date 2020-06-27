# TheMuse - A Job Portal

## Problem Statement
Build a system to manage jobs.

## Requirements

1. The application needs to fetch existing jobs from https://www.themuse.com/developers/api/v2

2. A frontend where the user can **View and Bookmark jobs.** 
  - On launching the application the user should get the login page. The login page should have a link for registration using which the user should be able to register. On successful registration the user should be taken to the login page. Upon login, the user should be taken to the home page.
  - Proper navigation links for all the pages should be available within pages.
  - Error handling should be implemented across pages. Appropriate messages should be    displayed for the same. Success messages should be displayed for the User Registration.
  - Logout feature should be implemented.

On click of the job the user should be able to see the actual landing page. ****
user.

## Modules

### MuseUI (User interface) - should be able to
    - search jobs
    - jobs should also have paginated output
    - bookmark jobs
    - should be able to see jobs bookmarked by him
    - UI should be responsive which can run smoothly on various devices
    - UI should be appealing and user friendly.


### AccountManager - should be able to manage user accounts.

### MuseManager - should be able to store all the bookmarks and searches

## Tech Stack
- Spring Boot
- MySQL
- Angular
- CI (Gitlab Runner)
- Docker, Docker Compose

## Flow of Modules

### Building frontend
- Building responsive views:
	1. Jobs - Populating from external api
	2. A view to show Bookmarked Jobs
	3. A view to authenticate users 
- Using Services to populate these data in views
- Stitching these views using Routes and Guards
- Making the UI Responsive
- Unit Tests should be created for the Components and Services
- E2E scripts using protractor should be created for the functional flows
- Implement CI - continuous Integration ( use .gitlab-ci.yml)
- Dockerize the frontend (create dockerfile, docker-compose.yml and get it executed through docker compose)


### Note: FrontEnd and all the backend services should be dockerized and run through docker-compose

### Building the Account Manager
- Creating a server in Java to facilitate registration and login with MySQL as backend. Upon login, JWT token has to be generated. It has to be used in the Filters set in other services.
- Writing swagger documentation
- Unit Testing of the entire code which involves the positive and negative scenarios
- Implement continuous Integration CI ( use .gitlab-ci.yml)
- Dockerize the Account Manager Service (create dockerfile, docker-compose.yml and get it executed through docker compose)


### Building the Muse Manager
- Building a server in Java to facilitate CRUD operation over Jobs and bookmarked resources stored in MySQL.JWT Filter should be applied for all the API calls of the favourite service. JWT token should be used to authorize the user access to all the resources
- Writing Swagger Documentation
- Write Unit Test Cases and get it executed.
- Implement CI - continuous Integration ( use .gitlab-ci.yml)
- Dockerize the Service(create dockerfile and update the docker-compose.yml)

### Demonstrate the entire application
    1. Make sure all the functionalities are implemented
    2. Make sure both the UI (Component and Services) and server side (For all layers) codes are unit tested. 
    3. All the Services are up and running using docker (Dockercompose should be used for running them)
    4. E2E tests should be executed and shown
    5. Application is completely responsive in nature
