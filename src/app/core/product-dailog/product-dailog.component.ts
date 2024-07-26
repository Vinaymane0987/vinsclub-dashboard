import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Product } from '../../../types';

@Component({
  selector: 'app-product-dailog',
  standalone: true,
  imports: [FormsModule, DialogModule, Button],
  templateUrl: './product-dailog.component.html',
  styleUrl: './product-dailog.component.scss',
})
export class ProductDailogComponent {
  @Input() display: boolean = false;
  @Input() header!: string;
  @Input() product: Product = {
    title: '',
    description: '',
    imageUrl: '',
    price: 0,
  };

  @Output() confirm: EventEmitter<Product> = new EventEmitter<Product>();

  onConfirm() {
    this.confirm.emit(this.product);
  }

  onCancel() {
    this.display = false;
  }
}
