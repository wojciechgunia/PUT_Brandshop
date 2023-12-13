import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs';
import { PrimitiveProduct } from 'src/app/modules/core/models/product.model';
import { ProductsService } from 'src/app/modules/core/services/products.service';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-delete-product-form',
  templateUrl: './delete-product-form.component.html',
  styleUrls: ['./delete-product-form.component.scss'],
})
export class DeleteProductFormComponent implements OnInit {
  filteredOptions!: Observable<PrimitiveProduct[]>;
  searchControl = new FormControl<string>('');
  paginator: any;

  constructor(
    private productService: ProductsService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((value) => this.productService.getProducts(1, 10, value)),
      map(({ products }) => {
        return [...products];
      }),
    );
  }

  openDeleteProductDialog(name: string, createAt: string) {
    const date = createAt.replaceAll('-', '');
    const dialog = this.dialog.open(DeleteDialogComponent, {
      data: { name: name, date: date },
      panelClass: 'dialog',
    });
    dialog.afterClosed().subscribe({
      next: () => {
        this.searchControl.reset();
      },
    });
  }
}
