import { Component, OnInit, NgZone } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import {MatSnackBar} from '@angular/material'
import { UserService } from './../services/user.service'
import { AuthService } from './../services/auth.service'
import { User } from '../services/user.model'
import { Task } from '../interfaces/task.interface'
import { Goal } from '../interfaces/goal.interface'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  user: User = new User()
  users: Array<User>
  userTasks: Array<Task>
  allTasks: Array<Task>
  userGoals: Array<Goal>
  allGoals: Array<Goal>
  isAdmin = false

  constructor(
    private userService: UserService, 
    private authService: AuthService,
    private router: Router, 
    private route: ActivatedRoute,
    public snackBar: MatSnackBar, 
    private ngZone: NgZone
  ) { 

  }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
        console.log('user', this.user)
      }
    })
    this.userService.getTasks().then((tasks: Array<any>) => {
      console.log(tasks)
      this.allTasks = tasks
      this.userTasks = tasks.filter(task => task.userId === this.user.uid)
      console.log('userTasks', this.userTasks)
    }, (error) => {
      console.log(error)
    })
    this.userService.getGoals().then((goals: Array<any>) => {
      console.log('all goals', goals)
      this.allGoals = goals
      this.userGoals = goals.filter(goal => goal.userId === this.user.uid)
    }, (error) => {
      console.log(error)
    })
    this.userService.getUsers().then((users: Array<User>) => {
      this.users = users;
      console.log('users', this.users)
    })
  }

  logout() {
    this.authService.doLogout()
    this.router.navigate(['/'])
  }

}
