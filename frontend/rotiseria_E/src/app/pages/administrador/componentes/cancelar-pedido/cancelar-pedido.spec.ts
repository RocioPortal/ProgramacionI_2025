import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelarPedido } from './cancelar-pedido';

describe('CancelarPedido', () => {
  let component: CancelarPedido;
  let fixture: ComponentFixture<CancelarPedido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelarPedido]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelarPedido);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
