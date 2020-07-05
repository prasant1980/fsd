export class User {    
    userId: string;
    userPassword: string;
    constructor() {
        this.userId = '';
        this.userPassword = '';
      }
  }
  export class UserDetails{
    userId :string;  
    userPassword :string;
    firstName: string;
    lastName: string;
    userRole :string;
    constructor() {
        this.userId = '';
        this.userPassword = '';
        this.firstName = '';
        this.lastName = '';      
        this.userRole = '';
    }
  }