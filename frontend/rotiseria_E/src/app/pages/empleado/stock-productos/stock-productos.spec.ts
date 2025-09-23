import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockProductos } from './stock-productos';

describe('StockProductos', () => {
  let component: StockProductos;
  let fixture: ComponentFixture<StockProductos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockProductos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockProductos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
