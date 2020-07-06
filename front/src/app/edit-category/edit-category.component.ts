import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { DataService } from '../data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogData } from '../category-view/category-view.component';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent {

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

  edit() {
    this.loading = true;
    let message = '';
    this.data.category.name = this.name.value
    this.dataService
      .editCategories(this.data.category.id, this.data.category)
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
