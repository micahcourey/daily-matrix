import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'mx-dialog',
  templateUrl: './mx-dialog.component.html',
  styleUrls: ['./mx-dialog.component.scss']
})
export class MxDialogComponent implements OnInit {
  @Input() title: string
  @Output() saveClicked = new EventEmitter

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
  }

  // openDialog() {

  //   const dialogConfig = new MatDialogConfig();

  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;

  //   this.dialog.open(MxDialogComponent, dialogConfig);
  // }

  close() {
    // this.dialogRef.close();
  }

  save() {
    // this.dialogRef.close(this.form.value);
  }

}
