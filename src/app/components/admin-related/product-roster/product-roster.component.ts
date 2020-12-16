import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {Product} from '../../../model/product';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogElementsExampleDialog} from '../../user-related/signup/signup.component';

export interface DialogData {
  msg: string;
}


@Component({
  selector: 'app-product-roster',
  templateUrl: './product-roster.component.html',
  styleUrls: ['./product-roster.component.css']
})
export class ProductRosterComponent implements OnInit, AfterViewInit {

  msg: string[];
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['image', 'name', 'price', 'categoryType',
     'stock', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductService, private router: Router, public dialog: MatDialog,
              @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.fetchAllProducts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  fetchAllProducts() {
    this.productService.getAllElevated().subscribe(
      data => {
        this.dataSource.data = data;
      }, error => {
        console.log(error);
      }
    );

  }
  onDelete(product: Product) {
    if (confirm('Are you sure to delete this product ' + product.name)) {
      this.productService.deleteProduct(product.id).subscribe(
        data => {
          console.log(data);
          this.openDialog('Product Deleted Successfully');
        }, error => {
         this.openDialog(error.error.text);
        }
      );
    }
  }

  refreshPage() {
    this.router.navigateByUrl('/admin-product-roster', {skipLocationChange: false}).then(() =>
      this.document.defaultView.location.reload());
  }

}
