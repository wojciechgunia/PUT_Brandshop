import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-image',
  templateUrl: './dialog-image.component.html',
  styleUrls: ['./dialog-image.component.scss'],
})
export class DialogImageComponent {
  constructor(public dialogRef: MatDialogRef<DialogImageComponent>) {}
}
