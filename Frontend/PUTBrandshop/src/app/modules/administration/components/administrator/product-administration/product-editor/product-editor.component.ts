import { Component } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { BehaviorSubject } from 'rxjs';
import { Category } from 'src/app/modules/core/models/categories.model';
import { AddProduct } from 'src/app/modules/core/models/forms.model';
import { Image } from 'src/app/modules/core/models/image.model';
import { AddProductData } from 'src/app/modules/core/models/product.model';
import { CategoriesService } from 'src/app/modules/core/services/categories.service';
import { FormService } from 'src/app/modules/core/services/form.service';
import { ImageService } from 'src/app/modules/core/services/image.service';
import { ProductsService } from 'src/app/modules/core/services/products.service';
import { DialogImageComponent } from '../../dialog-image/dialog-image.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss'],
})
export class ProductEditorComponent {
  selectedFile: File | null = null;
  fileName: string | null = null;

  imageUrls: Image[] = [];

  success: string | null = null;
  error: string | null = null;
  error2: string | null = null;

  addProductForm: FormGroup<AddProduct> = this.formService.initAddProductForm();

  categories: BehaviorSubject<Category[]> = this.categoriesService.categories;

  constructor(
    private imageService: ImageService,
    private formService: FormService,
    private categoriesService: CategoriesService,
    private productService: ProductsService,
    public dialog: MatDialog
  ) {}

  get controls() {
    return this.addProductForm.controls;
  }

  get parameters(): FormArray<
    FormGroup<{
      key: FormControl<string>;
      value: FormControl<string>;
    }>
  > {
    return this.addProductForm.controls.parameters;
  }

  addFile() {
    const dialogRef = this.dialog.open(DialogImageComponent, {
      width: '80%',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
    });
    dialogRef.afterClosed().subscribe((result: Image) => {
      if (result) {
        this.imageUrls.push(result);
      }
    });
  }

  setActiveImages(imageArray: Image[]) {
    this.imageUrls = [...imageArray];
  }

  getErrorMessage(typ: string, control: FormControl): string {
    return this.formService.getErrorMessage(typ, control);
  }

  config: AngularEditorConfig = this.imageService.config;

  addProduct() {
    const formValue = this.addProductForm.getRawValue();
    const parametersObject: { [key: string]: string } = {};
    formValue.parameters.forEach((item) => {
      parametersObject[item.key] = item.value;
    });
    const parameters = `${JSON.stringify(parametersObject)}`;
    console.log(parameters);
    const imagesUid = this.imageUrls.map((url) => {
      const [, uid] = url.url.split('uid=');
      return uid;
    });

    const addProductData: AddProductData = {
      ...formValue,
      price: Number(formValue.price),
      parameters,
      imagesUid,
    };
    console.log(addProductData);
    this.productService.addProduct(addProductData).subscribe({
      next: () => {
        this.addProductForm.reset();
        this.imageUrls = [];
        this.error2 = '';
        this.success = 'Poprawnie dodano produkt';
      },
      error: (err) => {
        this.success = '';
        this.error2 = err;
      },
    });
  }

  deleteParameter(i: number) {
    this.parameters.removeAt(i);
  }

  addParameter() {
    const newGroup = new FormGroup({
      key: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
        nonNullable: true,
      }),
      value: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
        nonNullable: true,
      }),
    });
    this.parameters.push(newGroup);
  }
}
