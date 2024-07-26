import { Component, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ProductsService } from '../../shared/services/products.service';
import { Product, Response } from '../../../types';
import { TopbarComponent } from '../topbar/topbar.component';
import { ProductComponent } from './product/product.component';
import { ProductDailogComponent } from '../product-dailog/product-dailog.component';
import { BehaviorSubject, debounceTime, Subject } from 'rxjs';
import { ProductActions } from './store/actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [TopbarComponent, ProductComponent, ProductDailogComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  products = signal<Product[]>([]);
  filteredProducts = signal<Product[]>([]);
  searchTerm$ = new BehaviorSubject<string>('');
  displayAddPopup = signal<boolean>(false);
  displayEditPopup = signal<boolean>(false);
  selectedProduct = signal<Product>({
    id: 0,
    title: '',
    description: '',
    imageUrl: '',
    price: 0,
  });
  apiUrl = environment.productApiUrl;
  constructor(private productsService: ProductsService, private store: Store) {}

  // implementing search functionality
  onSearchTermChange(searchTerm$: BehaviorSubject<string>): void {
    searchTerm$.pipe(debounceTime(300)).subscribe((term) => {
      this.filterProducts(term);
    });
  }

  filterProducts(term: string) {
    if (term.trim() === '') {
      this.filteredProducts.set(this.products());
    } else {
      const filtered = this.products().filter((product) => {
        return product.title.toLowerCase().includes(term.toLowerCase());
      });
      this.filteredProducts.set(filtered);
    }
  }

  // toggle popup
  toggleAddPopup(event: boolean) {
    this.displayAddPopup.set(event);
  }

  toggleEditPopup(event: { product: Product; isOpen: boolean }) {
    const { product, isOpen } = event;
    this.selectedProduct.set(product);
    this.displayEditPopup.set(isOpen);
  }

  // delete product
  deleteProduct(product: Product) {
    this.productsService
      .deleteProduct(`${this.apiUrl}/${product.id}`)
      .subscribe({
        next: () => {
          this.getAllProducts();
        },
      });
  }

  // add product
  onConfirmAdd(createProduct: Product) {
    this.AddProduct(createProduct);
    this.displayAddPopup.set(false);
  }

  AddProduct(product: Product) {
    return this.productsService.addProduct(this.apiUrl, product).subscribe({
      next: () => {
        this.getAllProducts();
      },
    });
  }

  // edit product
  onconfirmEdit(selectedProduct: Product) {
    this.EditProduct(selectedProduct);
    this.displayEditPopup.set(false);
  }

  EditProduct(product: Product) {
    return this.productsService
      .editProduct(`${this.apiUrl}/${product.id}`, product)
      .subscribe({
        next: () => {
          this.getAllProducts();
        },
      });
  }

  // get all products
  getAllProducts() {
    return this.productsService.getAllProduct(this.apiUrl).subscribe({
      next: (data: Response<Product[]>) => {
        this.products.set(data?.data);
        this.filteredProducts.set(this.products());
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnInit() {
    this.getAllProducts();
    this.store.dispatch(ProductActions.loadProducts());
  }
}
