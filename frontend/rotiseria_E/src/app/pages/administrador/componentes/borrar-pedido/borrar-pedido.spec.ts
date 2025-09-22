import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarPedido } from './borrar-pedido';

describe('BorrarPedido', () => {
  let component: BorrarPedido;
  let fixture: ComponentFixture<BorrarPedido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrarPedido]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrarPedido);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
