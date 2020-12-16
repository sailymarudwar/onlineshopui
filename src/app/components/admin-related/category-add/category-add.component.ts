import { Component, OnInit,Inject } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../model/category';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';

export interface DialogData {
  msg: string;
}


@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  hasSearchString: boolean;
  categoryId:string;
  element: HTMLElement;
  pageTitle:string;
  constructor(private categoryService: CategoryService, public dialog: MatDialog, private router: Router,private route: ActivatedRoute) {
    this.errors = [];
  }
  categoryAlreadyExists = false;
  errors: string[];
  msg: string[];

  category: Category = new Category();
  ngOnInit(): void {
    this.hasSearchString = this.route.snapshot.paramMap.has('id');
    this.pageTitle = 'Category Add';
    if (this.hasSearchString) {
      // yes, there is
      this.pageTitle = 'Category Update';
      this.categoryId = this.route.snapshot.paramMap.get('id')
      this.categoryService.getCategory(this.categoryId).subscribe(
        data => {
          this.category = data;
        }, error => {
          alert(error.error);
        }
      );
    }
  }
  onSubmit(form: NgForm) {
    this.errors = [];
    this.msg = [];
    this.saveCategory(form);
  }

  ngAfterViewInit() {
    this.element = document.getElementById('categorySubmitButton');
    if (this.hasSearchString) {    
      this.element.removeAttribute('disabled');
    }else {
      this.element.setAttribute('disabled',"true");
    }
  }

  saveCategory(form: NgForm) {
    this.categoryService.createCategory(this.category).subscribe(data => {
      this.msg.push('Category Added');
      form.resetForm();
      this.openDialog('Category Added Successfully');
    },
      error => {
        if (error.status === 409) {
          this.categoryAlreadyExists = false;
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
      this.router.navigate(['/admin-category-roster']).then(() => {
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
