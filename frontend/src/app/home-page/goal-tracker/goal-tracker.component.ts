import { Component, OnInit, Input, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material'
import { FormGroup, FormControl } from '@angular/forms'
import {MatSnackBar} from '@angular/material';
import { SubscriptionLike as ISubscription } from 'rxjs'
import { UserService } from '../../services/user.service'
import * as moment from 'moment'
import { Goal } from '../../interfaces/goal.interface'
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'goal-tracker',
  templateUrl: './goal-tracker.component.html',
  styleUrls: ['./goal-tracker.component.scss']
})
export class GoalTrackerComponent implements OnInit {
  @Input() userGoals
  @Input() user 
  
  step = 0
  showAddGoal: boolean
  editMode: boolean
  quarters: Array<any>
  goalForm: FormGroup
  goalSub: ISubscription

  constructor(private dialog: MatDialog, private _userService: UserService, public snackBar: MatSnackBar) { 
    console.log('quarters', this.quarters)
  }

  ngOnInit() {
    console.log(this.userGoals)
    if (this.userGoals) {
      this.quarters = this.getQuarters()
    }
  }

  addGoal(goal: Goal) {
    console.log('goal', goal)

    this._userService.postGoal(goal).then((res) => {
      this.userGoals.push(goal)
      this.quarters = this.getQuarters();
    })
  }

  deleteGoal(goalId) {
    this._userService.deleteGoal(goalId).then((res) => {
      console.log('deleted')
      this.userGoals = this.userGoals.filter(goal => goal.id !== goalId)
      this.quarters = this.getQuarters()
    })
  }

  editGoals() {
    this.goalForm = new FormGroup({})
    this.userGoals.forEach((goal: Goal) => {
      this.goalForm.addControl(goal.id.toString(), new FormControl(goal.body, []))
    })
    this.editMode = true;
    console.log(this.goalForm)
  }

  updateGoalStatus(goal) {
    goal.active = !goal.active;
    this._userService.patchGoal(goal).then((res) => {
      console.log('goal updated', res)
      if (goal.active) {
        this.openSnackBar('Goal status updated', 'Saved')
      } else {
        this.openSnackBar('Nice job completing your goal!', 'Completed')
      }

    })
  }

  saveGoals() {
    const formVals = this.goalForm.value
    console.log(formVals)
    let updatableGoals = []
    this.userGoals.forEach((goal: Goal) => {
      if (goal.body !== formVals[goal.id]) {
        goal.body = formVals[goal.id]
        updatableGoals.push(goal)
      }
    })
    console.log(updatableGoals)
    updatableGoals.forEach((goal: Goal) => {
      let i = 0;
      this._userService.patchGoal(goal).then((res) => {
        console.log('goal updated', res)
        if (i === 0) {
          this.openSnackBar('Your goals have been updated', 'Saved')
        }
        i++;
      })
    })
    this.editMode = false
  }

  openDialog(quarter): void {
    let data: Goal = {
      body: '', 
      quarter: quarter.quarter, 
      quarter_year: quarter.year,
      date: moment().format('YYYY-MM-DD'),
      active: true,
      userId: this.user.id
    }
    const dialogRef = this.dialog.open(GoalDialogComponent, {
      width: '350px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === false) {
        return
      }
      this.addGoal(result)
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    })
  }

  setStep(index: number) {
    this.step = index
  }

  nextStep() {
    this.step++
  }

  prevStep() {
    this.step--
  }

  getQuarters() {
    return [
      { 
        quarter: moment().quarter(), 
        year: +moment().format('YYYY'), 
        start: moment().quarter(moment().quarter()).format('ll'), 
        end: moment().add(1, 'Q').subtract(1, 'day').format('ll'),
        goals: this.userGoals.filter(goal => goal.quarter === moment().quarter()),
      },
      { 
        quarter: moment().add(1, 'Q').quarter(), 
        year: +moment().add(1, 'Q').format('YYYY'), 
        start: moment().quarter(moment().add(1, 'Q').quarter()).format('ll'), 
        end: moment().add(2, 'Q').subtract(1, 'day').format('ll'),
        goals: this.userGoals.filter(goal => goal.quarter === moment().add(1, 'Q').quarter())
      },
      { 
        quarter: moment().add(2, 'Q').quarter(),  
        year: +moment().add(2, 'Q').format('YYYY'), 
        start: moment().add(2, 'Q').format('ll'), 
        end: moment().add(3, 'Q').subtract(1, 'day').format('ll'),
        goals: this.userGoals.filter(goal => goal.quarter === moment().add(2, 'Q').quarter())
      },
      { 
        quarter: moment().add(3, 'Q').quarter(), 
        year: +moment().add(3, 'Q').format('YYYY'), 
        start: moment().add(3, 'Q').format('ll'), 
        end: moment().add(4, 'Q').subtract(1, 'day').format('ll'),
        goals: this.userGoals.filter(goal => goal.quarter === moment().add(3, 'Q').quarter())
      },
    ]
  }

}

@Component({
  selector: 'goal-dialog',
  templateUrl: 'goal-dialog.component.html',
})
export class GoalDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<GoalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Goal) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}