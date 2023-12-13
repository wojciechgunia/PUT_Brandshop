import { NgModule } from '@angular/core';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { AddCategoryComponent } from './components/administrator/add-category/add-category.component';
import { EditProductsComponent } from './components/administrator/edit-products/edit-products.component';
import { SharedModule } from '../shared/shared.module';
import { AddProductFormComponent } from './components/administrator/edit-products/add-product-form/add-product-form.component';
import { DeleteProductFormComponent } from './components/administrator/edit-products/delete-product-form/delete-product-form.component';
import { UploadedImagesComponent } from './components/administrator/edit-products/add-product-form/uploaded-images/uploaded-images.component';
import { DeleteDialogComponent } from './components/administrator/edit-products/delete-product-form/delete-dialog/delete-dialog.component';
import { UserAdministrationComponent } from './components/administrator/user-administration/user-administration.component';
import { ProductAdministrationComponent } from './components/administrator/product-administration/product-administration.component';
import { CategoryAdministrationComponent } from './components/administrator/category-administration/category-administration.component';
import { OrderListComponent } from './components/administrator/order-list/order-list.component';
import { DialogConfirmComponent } from './components/administrator/dialog-confirm/dialog-confirm.component';
import { ProductEditorComponent } from './components/administrator/product-administration/product-editor/product-editor.component';
import { DialogImageComponent } from './components/administrator/dialog-image/dialog-image.component';

@NgModule({
  declarations: [
    AdministratorComponent,
    AddCategoryComponent,
    EditProductsComponent,
    AddProductFormComponent,
    DeleteProductFormComponent,
    UploadedImagesComponent,
    DeleteDialogComponent,
    UserAdministrationComponent,
    ProductAdministrationComponent,
    CategoryAdministrationComponent,
    OrderListComponent,
    DialogConfirmComponent,
    ProductEditorComponent,
    DialogImageComponent,
  ],
  imports: [SharedModule, AdministrationRoutingModule, AngularEditorModule],
})
export class AdministrationModule {}
