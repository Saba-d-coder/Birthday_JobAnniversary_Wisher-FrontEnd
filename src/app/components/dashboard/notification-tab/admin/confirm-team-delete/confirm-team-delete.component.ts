import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirm-team-delete',
  templateUrl: './confirm-team-delete.component.html',
  styleUrls: ['./confirm-team-delete.component.css'],
})
export class ConfirmTeamDeleteComponent implements OnInit {
  deleteRequiredConfirmationText: string = 'delete';

  loading: boolean = false;
  confirmationForm = this.formBuilder.group({
    confirmationText: [null, Validators.required],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfirmTeamDeleteComponent>,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.dialogRef.backdropClick().subscribe((result) => {
      this.dialogRef.close(false);
    });
  }

  submit() {
    var confirmation: boolean =
      this.confirmationForm.value.confirmationText ===
      this.deleteRequiredConfirmationText;

    this.dialogRef.close({ confirmation });
  }
}
