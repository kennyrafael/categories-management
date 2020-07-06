import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { getEnabledCategories } from 'trace_events';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  filter: string = '';
  filtering = true;
  modal;

  @ViewChild(MatAccordion) accordion: MatAccordion;

  categories: any = [];

  constructor(
    private modalService: MatDialog,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories(search: string = '') {
    this.filtering = true;
    this.dataService.getCategories(search).subscribe((data: any) => {
      if (data.success) {
        this.categories = data.data;
        console.log(this.categories)
        this.filtering = false;
      }
    });
  }

  search() {
    this.getCategories(this.filter);
  }

  openDialog(event) {
    event.stopPropagation();
    this.modal = this.modalService.open(CreateCategoryComponent, {
      width: '450px',
    });

    this.modal.afterClosed().subscribe((result) => {
      this.getCategories();
    });
  }
}
