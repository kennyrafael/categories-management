import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CategoriesComponent } from './categories/categories.component';
import { MatTreeModule } from '@angular/material/tree';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import { CategoryViewComponent } from './category-view/category-view.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreateCategoryComponent } from './create-category/create-category.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

const modules = [
  HttpClientModule,
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  MatToolbarModule,
  MatIconModule,
  LayoutModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatTreeModule,
  MatExpansionModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  FormsModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  FormsModule,
  ReactiveFormsModule
]

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    CategoryViewComponent,
    CreateCategoryComponent,
    DeleteCategoryComponent,
    EditCategoryComponent
  ],
  imports: modules,
  exports: modules,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
