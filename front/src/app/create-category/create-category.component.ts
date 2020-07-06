import { Component, Inject } from '@angular/core';
import { DialogData } from '../category-view/category-view.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent {
  name = new FormControl('', [Validators.required]);
  category_id: null;

  loading = false;

  constructor(
    public dialogRef: MatDialogRef<CreateCategoryComponent>,
    private dataService: DataService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    if (data) this.category_id = data.category.id;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  create() {
    if (this.name.value !== '') {
      this.loading = true;
      let message = '';
      this.dataService
        .createCategories({
          name: this.name.value,
          category_id: this.category_id,
        })
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
}
