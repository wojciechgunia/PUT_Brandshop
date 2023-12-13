import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryForm } from 'src/app/modules/core/models/forms.model';
import { CategoriesService } from 'src/app/modules/core/services/categories.service';
import { FormService } from 'src/app/modules/core/services/form.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent {
  constructor(
    private formService: FormService,
    private categoriesService: CategoriesService,
  ) {}

  successMsg: string | null = null;
  errorMsg: string | null = null;

  categoryForm: FormGroup<CategoryForm> =
    this.formService.initAddCategoryForm();

  onAddCategory() {
    this.categoriesService
      .addCategory(this.categoryForm.getRawValue())
      .subscribe({
        next: () => {
          this.errorMsg = null;
          this.successMsg = 'Poprawnie dodano kategorię.';
        },
        error: (err) => {
          this.successMsg = null;
          this.errorMsg = err;
        },
      });
  }

  get controls() {
    return this.categoryForm.controls;
  }

  getErrorMessage(type: string, control: FormControl<any>): string {
    return this.formService.getErrorMessage(type, control);
  }
}
