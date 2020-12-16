import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// My components/modules
import {ProductListComponent} from './components/shop-related/product-list/product-list.component';
import {ProductDetailsComponent} from './components/shop-related/product-details/product-details.component';
import {CartDetailsComponent} from './components/shop-related/cart-details/cart-details.component';
import { SignupComponent } from './components/user-related/signup/signup.component';
import {LoginComponent} from "./components/user-related/login/login.component";
import {LoggedInGuard} from "./guards/logged-in.guard";
import { ProductAddComponent } from './components/admin-related/product-add/product-add.component';
import {AdminMenuComponent} from "./components/admin-related/admin-menu/admin-menu.component";
import {AdminGuard} from "./guards/admin-guard.service";
import {ProductRosterComponent} from "./components/admin-related/product-roster/product-roster.component";
import {CategoryRosterComponent} from "./components/admin-related/category-roster/category-roster.component";
import {CategoryAddComponent} from "./components/admin-related/category-add/category-add.component";
import { UserProfileComponent } from './components/user-related/user-profile/user-profile.component';
import { OrderListComponent } from './components/order-related/order-list/order-list.component';
import { OrderDetailsComponent } from './components/order-related/order-details/order-details.component';


const routes: Routes = [
  {
    path: 'admin-category-roster',
    component: CategoryRosterComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin-product-roster',
    component: ProductRosterComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin-menu',
    component: AdminMenuComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'cart-details',
    component: CartDetailsComponent,
    canActivate: [LoggedInGuard]
  },
   {
    path:  'orders',
    component: OrderListComponent,
    canActivate: [LoggedInGuard],
  },
  {
    path:  'orders/orderDetails/:id',
    component: OrderDetailsComponent,
    canActivate: [LoggedInGuard],
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [LoggedInGuard]
  },
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:searchStr', component: ProductListComponent},
  {path: 'category/:categoryType', component: ProductListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {
    path:  'product-add',
    component: ProductAddComponent,
    canActivate: [AdminGuard],
  },
  {
    path:  'category-add',
    component: CategoryAddComponent,
    canActivate: [AdminGuard],
  },
  {
    path:  'product-update/:id',
    component: ProductAddComponent,
    canActivate: [AdminGuard],
  },
  {
    path:  'category-update/:id',
    component: CategoryAddComponent,
    canActivate: [AdminGuard],
  },
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
];

// @ts-ignore
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [LoggedInGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
