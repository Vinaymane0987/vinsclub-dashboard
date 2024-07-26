import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsService } from '../../../shared/services/products.service';
import { ProductActions } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ProductEffect {
  constructor(
    private productService: ProductsService,
    private actions$: Actions
  ) {}
  
  apiUrl = environment.productApiUrl;

  getProduct$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      switchMap(() =>
        this.productService.getAllProduct(this.apiUrl).pipe(
          map(products => ProductActions.loadProductSuccess({ products })),
          catchError(error => of(ProductActions.loadProductFailure({ error }))) // Ensure error is wrapped in an object
        )
      )
    )
  );
}
