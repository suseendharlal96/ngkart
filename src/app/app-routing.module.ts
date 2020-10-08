import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './components/auth/auth.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: '', component: ProductsComponent },
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
