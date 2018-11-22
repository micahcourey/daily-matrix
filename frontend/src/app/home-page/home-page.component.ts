import { Component, OnInit, ViewChild, NgZone } from '@angular/core'
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {MatSnackBar} from '@angular/material';
import { SubscriptionLike as ISubscription } from 'rxjs'
import { debounceTime, take } from 'rxjs/operators'
import { FormGroup, Validators, FormControl } from '@angular/forms'
import * as moment from 'moment'
import { UserService } from './../services/user.service'
import { Router } from '@angular/router'
import { User } from '../interfaces/user.interface';
import { Task } from '../interfaces/task.interface';
import { Goal } from '../interfaces/goal.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  user: User
  users: Array<User>
  userTasks: Array<Task>
  allTasks: Array<Task>
  userGoals: Array<Goal>
  allGoals: Array<Goal>
  isAdmin = false

  constructor(private _userService: UserService, private router: Router, public snackBar: MatSnackBar, private ngZone: NgZone) { 

  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('matrix_user'))
    if (this._userService.isAdmin()) {
      this.isAdmin = true;
    }
    this._userService.getTasks().then((tasks: Array<any>) => {
      console.log(tasks)
      this.allTasks = tasks
      this.userTasks = tasks.filter(task => task.userId === this.user.id)
      console.log('userTasks', this.userTasks)
    }, (error) => {
      console.log(error)
    })
    this._userService.getGoals().then((goals: Array<any>) => {
      console.log('all goals', goals)
      this.allGoals = goals
      this.userGoals = goals.filter(goal => goal.userId === this.user.id)
    }, (error) => {
      console.log(error)
    })
    this._userService.getUsers().then((users: Array<User>) => {
      this.users = users;
      console.log('users', this.users)
    })
  }

  logout() {
    this._userService.logout()
    this.router.navigate(['/'])
  }

}
