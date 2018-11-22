import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SubscriptionLike as ISubscription } from 'rxjs'
import * as moment from 'moment'
import { User } from 'src/app/interfaces/user.interface';
import { Task } from 'src/app/interfaces/task.interface';

@Component({
  selector: 'matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss']
})
export class MatrixComponent implements OnInit {
  @Input() tasks: Array<Task>;
  @Input() users: Array<User>;

  matrix: Array<any>;
  matrixColumns = ['name', 'yesterday', 'today', 'tomorrow']
  selectedDate: FormControl
  dateSub: ISubscription
  
  constructor() { 
    this.selectedDate = new FormControl(new Date());
    this.dateSub = this.selectedDate.valueChanges.subscribe(() => {
      this.matrix = this.setMatrix(this.users, this.selectedDate.value)
    })
  }

  ngOnInit() {
    this.matrix = this.setMatrix(this.users, moment().format('YYYY-MM-DD'));
  }

  setMatrix(users, date) { 
    const matrix = []   
    users.forEach((user: User, i) => {
      const userTasks: Array<Task> = this.tasks.filter(task => task.userId === user.id)
      console.log(user.username, userTasks)
      console.log(user, i)
      matrix.push({
        username: user.username,
        tasks: userTasks,
        yesterday: this.findTask(moment(date).subtract(1, 'days'), userTasks),
        today: this.findTask(moment(date), userTasks),
        tomorrow: this.findTask(moment(date).add(1, 'days'), userTasks),
      })
    })
    return matrix
  }

  findTask(day, tasks) {
    const task = tasks.find(t => moment(t.date.split('T')[0]).format('ll') === moment(day).format('ll'))
    if (!task) {
      return ''  
    }
    if (!task && (moment(task.date).day("Saturday") || moment(task.date).day("Sunday"))) {
      console.log('today is the weekend!')
    }
    return task.body
  }

}
