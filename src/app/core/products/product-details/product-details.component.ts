import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../shared/services/products.service';
import { environment } from '../../../../environments/environment';
import { Product, Response } from '../../../../types';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgIf],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private productService: ProductsService
  ) {
  }
  apiUrl = environment.productApiUrl;
  product = signal<Product | undefined>(undefined);

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      const productId = +params['id'];
      this.fetchProductDetails(productId);
    });
  }

  fetchProductDetails(productId: number) {
    return this.productService
      .findOne(`${this.apiUrl}/${productId}`)
      .subscribe({
        next: (data: Response<Product>) => {
          this.product.set(data.data);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
