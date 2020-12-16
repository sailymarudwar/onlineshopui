import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ProductService} from './services/product.service';
import {ProductListComponent} from './components/shop-related/product-list/product-list.component';
import {NavigationComponent} from './components/main-view/navigation/navigation.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MaterialModule} from './material/material.module';
import {CardComponent} from './components/shop-related/product-card/card.component';
import {CategoryMenuComponent} from './components/main-view/category-menu/category-menu.component';
import {SearchComponent} from './components/main-view/search/search.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CartStatusComponent} from './components/main-view/cart-status/cart-status.component';
import {ProductDetailsComponent} from './components/shop-related/product-details/product-details.component';
import {CartDetailsComponent} from './components/shop-related/cart-details/cart-details.component';
import {SignupComponent} from './components/user-related/signup/signup.component';
import {LoginComponent} from './components/user-related/login/login.component';
import {UserService} from "./services/user.service";
import {AddCredentialsInterceptor} from "./interceptors/add-credentials.interceptor";
import {FormsModule} from '@angular/forms';
import {ProductAddComponent} from './components/admin-related/product-add/product-add.component';
import {CategoryAddComponent} from './components/admin-related/category-add/category-add.component';
import {AdminMenuComponent} from './components/admin-related/admin-menu/admin-menu.component';
import {UserStatusComponent} from './components/user-related/user-status/user-status.component';
import {ProductRosterComponent} from './components/admin-related/product-roster/product-roster.component';
import {CategoryRosterComponent} from './components/admin-related/category-roster/category-roster.component';
import {ProductUpdateComponent} from './components/admin-related/product-update/product-update.component';
import {UserProfileComponent} from './components/user-related/user-profile/user-profile.component';
import {OrderListComponent} from './components/order-related/order-list/order-list.component';
import {OrderDetailsComponent} from './components/order-related/order-details/order-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    NavigationComponent,
    CardComponent,
    CategoryMenuComponent,
    SearchComponent,
    CartStatusComponent,
    ProductDetailsComponent,
    CartDetailsComponent,
    SignupComponent,
    LoginComponent,
    ProductAddComponent,
    CategoryAddComponent,
    AdminMenuComponent,
    UserStatusComponent,
    ProductRosterComponent,
    CategoryRosterComponent,
    ProductUpdateComponent,
    UserProfileComponent,
    OrderListComponent,
    OrderDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
  ],
  providers: [ProductService, UserService, [{
    provide: HTTP_INTERCEPTORS,
    useClass: AddCredentialsInterceptor,
    multi: true
  }]],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
