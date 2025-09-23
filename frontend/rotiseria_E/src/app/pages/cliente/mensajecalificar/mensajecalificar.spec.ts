import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mensajecalificar } from './mensajecalificar';

describe('Mensajecalificar', () => {
  let component: Mensajecalificar;
  let fixture: ComponentFixture<Mensajecalificar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mensajecalificar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mensajecalificar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
