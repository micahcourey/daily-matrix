import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material'
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  apiLoginError;
  loggingIn: boolean;
  loginError: string;
  loggedIn: boolean;
  isError: boolean;
  user: any;

  constructor(private _userService: UserService, private router: Router, private dialog: MatDialog) { 
    this.loggingIn = false;
    this.loginError = "";
    this.loggedIn = false;
    this.isError = false;
		this.loginForm = new FormGroup({    
			email: new FormControl('', [ Validators.required, Validators.email ]),
			password: new FormControl('', [ ]),
    })
  }

  ngOnInit() {
    if (this._userService.isLoggedIn()) {
      this.router.navigate(['/home'])
    }
  }

  doLogin(){
    this.isError = false
		if (!this.loginForm.valid) {
			this.apiLoginError = {email: ['Your email or password is not valid']};
			return;
    }
    console.log(this.loginForm.value)
		if (this.apiLoginError) {
			this.apiLoginError = {};
		}
 		this._userService.login(this.loginForm.value).then((res:any) => {
      this.loginError = "";
      this.loggedIn = true;
      this.user = res;
      if (this.user.emailVerified === false) {
        this.openDialog({ newPassword: ''})
        return
      }
      this.router.navigate(['/home'])
      console.log(res)
			
 		}, (errors:any)=>{
      this.isError = true
      this.apiLoginError = errors
	  });
  }

  resetPassword(newPassword) {
    console.log(newPassword)
    this._userService.resetPassword(newPassword).then((res) => {
      this.user.emailVerified = true
      this._userService.updateUser(this.user).then((res) => {
        this.router.navigate(['/home'])
      }, (error) => {
        console.log(error)
        this.openDialog({ newPassword: ''})
      })
    }, (error) => {
      console.log(error)
      this.openDialog({ newPassword: ''})
    })

  }
  
  openDialog(data): void {
    let userData = {
      newPassword: ''
    }
    const dialogRef = this.dialog.open(ResetPasswordDialogComponent, {
      width: '350px',
      data: userData,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === false) {
        return
      }
      this.resetPassword(result)
    });
  }

}

@Component({
  selector: 'reset-password-dialog',
  templateUrl: 'reset-password-dialog.component.html',
})
export class ResetPasswordDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ResetPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
