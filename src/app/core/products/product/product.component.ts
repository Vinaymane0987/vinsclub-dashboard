import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Product } from '../../../../types';
import { NgFor, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgFor, NgOptimizedImage],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input() products!: Product[];
  @Output() toggleDialog: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() edit: EventEmitter<{ product: Product; isOpen: boolean }> =
    new EventEmitter<{ product: Product; isOpen: boolean }>();
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();
  displayAddPopup = signal<boolean>(false);
  displayEditPopup = signal<boolean>(false);
  constructor(private router: Router) {}

  navigateToProductDetailsPage(productId: number): void {
    this.router.navigate(['/products', productId]);
  }

  deleteProduct(id: number) {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      this.delete.emit(product);
    } else {
      alert('something went wrong');
    }
  }

  toggleEditPopup(id: number) {
    const product = this.products.find((p) => p.id === id) || null;
    this.displayEditPopup.set(!this.displayEditPopup());
    if (product) {
      this.edit.emit({ product, isOpen: this.displayEditPopup() });
    } else {
      console.error(`Product with id ${id} not found.`);
    }
  }

  toggleAddPopup() {
    this.displayAddPopup.set(!this.displayAddPopup());
    this.toggleDialog.emit(this.displayAddPopup());
  }
}
