import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../model/order';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogElementsExampleDialog } from '../../user-related/signup/signup.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  msg: string[];
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name', 'total','items','time','status'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private orderService: OrderService, private router: Router, public dialog: MatDialog,
    @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.fetchAllProducts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchAllProducts() {
    this.orderService.getAllOrders().subscribe(
      data => {
        this.dataSource.data = data;
      }, error => {
        console.log(error);
      }
    );
  }
}
