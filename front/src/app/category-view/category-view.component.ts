import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { DataService } from '../data.service';
import { MatAccordion } from '@angular/material/expansion';
import { DeleteCategoryComponent } from '../delete-category/delete-category.component';
import { EditCategoryComponent } from '../edit-category/edit-category.component';

export interface DialogData {
  category;
}

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.scss'],
})
export class CategoryViewComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @Input() categories: any[];
  trackByPackId = (index, category) => category.id;

  modal;

  current_category;

  constructor(
    private modalService: MatDialog,
    private dataService: DataService
  ) {}

  ngOnInit(): void {}

  openDialog(category, event) {
    event.stopPropagation();
    this.current_category = category;
    this.modal = this.modalService.open(CreateCategoryComponent, {
      width: '450px',
      data: { category: category },
    });

    this.modal.afterClosed().subscribe((result) => {
      this.updateCurrentCategory();
    });
  }

  openDialogEdit(category, event) {
    event.stopPropagation();
    this.current_category = category;
    this.modal = this.modalService.open(EditCategoryComponent, {
      width: '450px',
      data: { category: category },
    });

    this.modal.afterClosed().subscribe((result) => {
      this.updateCurrentCategory();
    });
  }

  openDialogDelete(category, event) {
    event.stopPropagation();
    this.current_category = category;
    this.modal = this.modalService.open(DeleteCategoryComponent, {
      width: '450px',
      data: { category: category },
    });

    this.modal.afterClosed().subscribe((result) => {
      this.deleteCurrentCategory();
    });
  }

  updateCurrentCategory() {
    this.dataService
      .getCategory(this.current_category.id)
      .subscribe((subcategories: any) => {
        this.categories = this.categories.map((category) => {
          if (category.id === this.current_category.id)
            return subcategories.data;
          return category;
        });
      });
  }

  deleteCurrentCategory() {
    this.categories = this.categories.filter(
      (category) => category.id !== this.current_category.id
    );
  }
}
