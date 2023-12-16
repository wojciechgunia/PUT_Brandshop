import { NgModule } from '@angular/core';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { AddCategoryComponent } from './components/administrator/add-category/add-category.component';
import { EditProductsComponent } from './components/administrator/edit-products/edit-products.component';
import { SharedModule } from '../shared/shared.module';
import { AddProductFormComponent } from './components/administrator/edit-products/add-product-form/add-product-form.component';
import { UploadedImagesComponent } from './components/administrator/edit-products/add-product-form/uploaded-images/uploaded-images.component';
import { UserAdministrationComponent } from './components/administrator/user-administration/user-administration.component';
import { ProductAdministrationComponent } from './components/administrator/product-administration/product-administration.component';
import { CategoryAdministrationComponent } from './components/administrator/category-administration/category-administration.component';
import { OrderListComponent } from './components/administrator/order-list/order-list.component';
import { DialogConfirmComponent } from './components/administrator/dialog-confirm/dialog-confirm.component';
import { ProductEditorComponent } from './components/administrator/product-administration/product-editor/product-editor.component';
import { DialogImageComponent } from './components/administrator/dialog-image/dialog-image.component';
import { DialogChangeRoleComponent } from './components/administrator/user-administration/dialog-change-role/dialog-change-role.component';
import { OrderModule } from '../order/order.module';

@NgModule({
  declarations: [
    AdministratorComponent,
    AddCategoryComponent,
    EditProductsComponent,
    AddProductFormComponent,
    UploadedImagesComponent,
    UserAdministrationComponent,
    ProductAdministrationComponent,
    CategoryAdministrationComponent,
    OrderListComponent,
    DialogConfirmComponent,
    ProductEditorComponent,
    DialogImageComponent,
    DialogChangeRoleComponent,
  ],
  imports: [
    SharedModule,
    AdministrationRoutingModule,
    AngularEditorModule,
    OrderModule,
  ],
})
export class AdministrationModule {}
