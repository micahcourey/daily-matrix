import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }

  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      })
    })
  }

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        // localStorage.setItem('matrix_user', JSON.stringify(res.user.m))
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        console.log(res)
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this.afAuth.auth.signOut()
        resolve();
      }
      else{
        reject();
      }
    });
  }

  // setUser(userId: string, token: string) {
	// 	return new Promise( (resolve, reject) => {
	// 		const sub = this.http.get(`${this.databaseUrl}/MatrixUsers/${userId}?access_token=${token}`)
	// 		.pipe(map(this.extractData)).pipe(catchError(this.handleError))

	// 		sub.subscribe((res) => { 
	// 			localStorage.setItem('matrix_user', JSON.stringify(res))
	// 			console.log(res)
	// 			this.user = res;
	// 			this.loggedIn = true;
	// 			this.loginStatusChange.next({logged_in: true})
	// 			resolve(res);
	// 		}, (rej) => {
	// 			console.log(rej)
	// 		}); 
	// 	});
	// }

}
