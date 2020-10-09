import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './components/auth/auth.component';
import { ProductCreationComponent } from './components/products/product-creation/product-creation.component';
import { ProductsComponent } from './components/products/products.component';

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
