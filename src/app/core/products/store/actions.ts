import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product, Response } from '../../../../types';

export const ProductActions = createActionGroup({
  source: 'Product',
  events: {
    'load Products': emptyProps(),
    'load Product Success': props<{ products: Response<Product[]> }>(),
    'load Product Failure': props<{ error: string }>(),
  },
});
