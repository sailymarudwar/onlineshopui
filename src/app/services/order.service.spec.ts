import { TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';
import {environment} from "../../environments/environment";
describe('OrderService', () => {
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
