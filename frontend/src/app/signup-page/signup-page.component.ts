import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  errorMessage: any;
  successMessage: string;
  signupForm: FormGroup;
  apiLoginError;
  loggingIn: boolean;
  loginError: string;
  loggedIn: boolean;
  isError: boolean;
  user: any;

  constructor(private authService: AuthService) { 
    this.signupForm = new FormGroup({    
			email: new FormControl('', [ Validators.required, Validators.email ]),
			password: new FormControl('', [ ]),
    })
  }

  ngOnInit() {
  }

  tryRegister(){
    this.authService.doRegister(this.signupForm.value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.successMessage = "Your account has been created";
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
    })
  }

}
