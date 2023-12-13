import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { AddCategoryComponent } from './components/administrator/add-category/add-category.component';
import { EditProductsComponent } from './components/administrator/edit-products/edit-products.component';
import { AdminGuard } from '../core/guards/admin.guard';
import { UserAdministrationComponent } from './components/administrator/user-administration/user-administration.component';
import { CategoryAdministrationComponent } from './components/administrator/category-administration/category-administration.component';
import { ProductAdministrationComponent } from './components/administrator/product-administration/product-administration.component';
import { OrderListComponent } from './components/administrator/order-list/order-list.component';

const routes: Routes = [
  {
    path: 'panel',
    component: AdministratorComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'kategorie', component: CategoryAdministrationComponent },
      { path: 'produkty', component: ProductAdministrationComponent },
      { path: 'uzytkownicy', component: UserAdministrationComponent },
      { path: 'zamowienia', component: OrderListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule {}
