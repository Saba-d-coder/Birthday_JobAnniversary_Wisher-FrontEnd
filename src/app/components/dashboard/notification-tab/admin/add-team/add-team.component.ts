import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css'],
})
export class AddTeamComponent implements OnInit {
  sub!: Subscription | undefined;
  loading: boolean = false;
  createTeamForm = this.formBuilder.group({
    teamName: null,
    teamDescription: null,
  });

  constructor(
    public dialogRef: MatDialogRef<AddTeamComponent>,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  submit(): void {
    this.loading = true;
    this.sub = this.adminService
      .createTeam(
        this.createTeamForm.value.teamName,
        this.createTeamForm.value.teamDescription
      )
      .subscribe({
        next: (response: any) => {
          if (response.status == 'success') {
            this.loading = false;
            this.dialogRef.close({ reload: true });
            this.openSnackBar(response.message);
          }
        },
        error: (err) => {
          this.loading = true;
          this.dialogRef.close();
          this.openSnackBar(err.error);
          console.log(err.error);
        },
      });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
      panelClass: ['snackbar'],
    });
  }
}
