import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDailogComponent } from './product-dailog.component';

describe('ProductDailogComponent', () => {
  let component: ProductDailogComponent;
  let fixture: ComponentFixture<ProductDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDailogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
