import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { DialogContract } from '../contracts/DialogContract';

@Component({
  selector: 'app-global-dialog',
  templateUrl: './global-dialog.component.html',
  styleUrls: ['./global-dialog.component.scss'],
})
export class GlobalDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<GlobalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogContract) {}

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  ngOnInit(){

  }

}
