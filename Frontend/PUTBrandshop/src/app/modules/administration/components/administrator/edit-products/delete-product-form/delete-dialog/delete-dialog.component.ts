import { NotifierService } from 'angular-notifier';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/modules/core/models/product.model';
import { ProductsService } from 'src/app/modules/core/services/products.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit {
  product: Product | null = null;
  error: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { name: string; date: string },
    private productsService: ProductsService,
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    private notifierService: NotifierService,
  ) {}

  ngOnInit(): void {
    console.log(this.data.name, this.data.date);
    this.productsService.getProduct(this.data.name, this.data.date).subscribe({
      next: (product) => {
        this.product = product;
      },
      error: (err) => {
        this.error = err;
      },
    });
  }

  deleteProduct() {
    if (this.product != null) {
      this.productsService.deleteProduct(this.product?.uid).subscribe({
        next: () => {
          this.notifierService.notify('success', 'Pomyślnie usunięto produkt');
          this.dialogRef.close();
        },
        error: (err) => {
          this.error = err;
        },
      });
    }
  }
}
