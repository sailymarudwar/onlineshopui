import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CategoryService} from '../../../services/category.service';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {Category} from '../../../model/category';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogElementsExampleDialog} from '../../user-related/signup/signup.component';


@Component({
  selector: 'app-category-roster',
  templateUrl: './category-roster.component.html',
  styleUrls: ['./category-roster.component.css']
})
export class CategoryRosterComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'categoryType', 'createTime', 'updateTime', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private categoryService: CategoryService, private router: Router,public dialog: MatDialog,
              @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.fetchAllCategories()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchAllCategories() {
    this.categoryService.getAll().subscribe(

      data => {
        this.dataSource.data = data;
      }, error => {
        console.log(error);
      }
    );
  }

  openDialog(msg1:string): void {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog, {
     height: '200px',
     width: '600px',
     data: {msg: msg1}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshPage();
    });
  }

  onDelete(category: Category) {
    if (confirm('Are you sure to delete this category ' + category.name+'?. All associated products will be deleted!')) {
      this.categoryService.deleteCategory(category.id).subscribe(
        data => {
          console.log(data);
          this.openDialog('Category Deleted Successfully');
        }, error => {
         this.openDialog(error.error.text);
        }
      );
    }
  }

  refreshPage() {
    this.router.navigateByUrl('/admin-category-roster', {skipLocationChange: false}).then(() =>
      this.document.defaultView.location.reload());
  }

}
