import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';
import { DialogData } from '../category-view/category-view.component';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.scss']
})
export class DeleteCategoryComponent {


  name = new FormControl('', [Validators.required]);
  category_id: null;

  loading = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteCategoryComponent>,
    private dataService: DataService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    if (data) this.category_id = data.category.id;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete() {
    this.loading = true;
    let message = '';
    this.dataService
      .deleteCategories(this.category_id)
      .subscribe(
        (data: any) => {
          if (data.success) {
            this.dialogRef.close();
          }

          message = data.message;

          this._snackBar.open(message, 'ok', {
            duration: 3000,
          });

          this.loading = false;
        },
        (error) => {
          message = error.message;

          this._snackBar.open(message, 'ok', {
            duration: 3000,
          });
          this.loading = false;
        }
      );
  }

}
