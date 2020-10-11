import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './components/auth/auth.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductCreationComponent } from './components/products/product-creation/product-creation.component';
import { ProductsComponent } from './components/products/products.component';
import { AuthguardService } from './guard/auth-guard.service';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  {
    path: '',
    component: ProductsComponent,
    children: [
      { path: 'edit-product/:id', component: ProductCreationComponent },
      { path: 'create-product', component: ProductCreationComponent },
      { path: 'delete-product/:id', component: ProductCreationComponent },
    ],
  },
  { path: 'cart', component: CartComponent, canActivate: [AuthguardService] },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthguardService],
  },

  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
