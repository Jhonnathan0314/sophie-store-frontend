import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAllComponent } from './product-all.component';

describe('ProductAllComponent', () => {
  let component: ProductAllComponent;
  let fixture: ComponentFixture<ProductAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
