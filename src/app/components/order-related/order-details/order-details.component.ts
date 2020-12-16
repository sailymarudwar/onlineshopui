import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../model/order';
import { OrderDetail } from '../../../model/orderdetail';
import { Router, ActivatedRoute } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DOCUMENT } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogElementsExampleDialog } from '../../user-related/signup/signup.component';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  msg: string[];
  hasSearchString: boolean;
  orderId: string;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['image', 'name','description','itemprice' ,'quantity', 'price'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private orderService: OrderService, private router: Router, public dialog: MatDialog,
    @Inject(DOCUMENT) private document: Document, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.hasSearchString = this.route.snapshot.paramMap.has('id');
    if (this.hasSearchString) {
      // yes, there is
      this.orderId = this.route.snapshot.paramMap.get('id')
      this.fetchOrderDetails();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchOrderDetails() {
    this.orderService.getOrderDetails(this.orderId).subscribe(
      data => {
        this.dataSource.data = data;
      }, error => {
        console.log(error);
      }
    );
  }
}
