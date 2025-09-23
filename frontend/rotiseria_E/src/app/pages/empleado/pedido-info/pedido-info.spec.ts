import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoInfo } from './pedido-info';

describe('PedidoInfo', () => {
  let component: PedidoInfo;
  let fixture: ComponentFixture<PedidoInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
