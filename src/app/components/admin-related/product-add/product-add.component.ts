import { Component, OnInit,Inject } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../model/product';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/model/category';

export interface DialogData {
  msg: string;
}


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  hasSearchString: boolean;
  productId:string;
  element: HTMLElement;
  pageTitle:string;
  categories:Category[];
  constructor(private productService: ProductService, public dialog: MatDialog, private router: Router,private route: ActivatedRoute) {
    this.errors = [];
  }
  productAlreadyExists = false;
  errors: string[];
  msg: string[];
  product: Product = new Product();

  ngOnInit(): void {
    this.hasSearchString = this.route.snapshot.paramMap.has('id');
    this.pageTitle = 'Product Add';
    if (this.hasSearchString) {
      // yes, there is
      this.pageTitle = "Product Update";
      this.productId = this.route.snapshot.paramMap.get('id')
      this.productService.getProduct(this.productId).subscribe(
        data => {
          this.product = data;
        }, error => {
          alert(error.error);
        }
      );
    }
    this.productService.getAllCategories().subscribe(
      data => {
        this.categories = data;
      }, error => {
        alert(error.error);
      }
    );

  }

  onSubmit(form: NgForm) {
    this.errors = [];
    this.msg = [];
    this.saveProduct(form);
  }

  ngAfterViewInit() {
    this.element = document.getElementById('productSubmitButton');
    if (this.hasSearchString) {
      this.element.removeAttribute('disabled');
    }else {
      this.element.setAttribute('disabled', "true");
    }
  }

  saveProduct(form: NgForm) {
    this.productService.createProduct(this.product).subscribe(data => {
      this.msg.push('Product Added');
      form.resetForm();
      this.openDialog('Product Added Successfully');
    },
      error => {
        if (error.status === 409) {
          this.productAlreadyExists = false;
          this.errors.push(error.error);
        } else if (error.status === 200) {
          this.msg.push(error.error.text);
          form.resetForm();
          this.openDialog(error.error.text);
        }
        else {
          this.errors.push(error.error);
        }
      });
  }

  openDialog(msg1: string): void {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      height: '200px',
      width: '600px',
      data: { msg: msg1 }
    });

    dialogRef.afterClosed().subscribe(result => {
       this.router.navigate(['/admin-product-roster']).then(() => {
        window.location.reload();
      });
    });
  }
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: '../../dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogElementsExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
