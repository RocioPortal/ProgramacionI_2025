import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarEdicion } from './confirmar-edicion';

describe('ConfirmarEdicion', () => {
  let component: ConfirmarEdicion;
  let fixture: ComponentFixture<ConfirmarEdicion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmarEdicion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmarEdicion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
