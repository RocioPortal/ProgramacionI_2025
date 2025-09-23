import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mensajepedido } from './mensajepedido';

describe('Mensajepedido', () => {
  let component: Mensajepedido;
  let fixture: ComponentFixture<Mensajepedido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mensajepedido]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mensajepedido);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
