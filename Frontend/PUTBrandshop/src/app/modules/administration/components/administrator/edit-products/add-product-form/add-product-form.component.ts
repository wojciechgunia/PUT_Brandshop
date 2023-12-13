import { AddProductData } from './../../../../../core/models/product.model';
import { AddProduct } from './../../../../../core/models/forms.model';
import { Image } from 'src/app/modules/core/models/image.model';
import { ImageService } from './../../../../../core/services/image.service';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from 'src/app/modules/core/services/form.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CategoriesService } from 'src/app/modules/core/services/categories.service';
import { BehaviorSubject } from 'rxjs';
import { Category } from 'src/app/modules/core/models/categories.model';
import { ProductsService } from 'src/app/modules/core/services/products.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.scss'],
})
export class AddProductFormComponent {
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

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    if (this.selectedFile) {
      this.fileName = this.selectedFile.name;
    }
  }

  uploadFile() {
    this.error = null;
    if (this.selectedFile) {
      const formData = new FormData();

      formData.append('multipartFile', this.selectedFile);

      this.imageService.addImage(formData).subscribe({
        next: (resp) => {
          this.imageUrls = [...this.imageUrls, { ...resp }];
        },
        error: (err) => {
          this.error = err;
        },
      });
    }
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
