import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajesPageComponent } from './mensajes-component';

describe('MensajesPageComponent', () => {
  let component: MensajesPageComponent;
  let fixture: ComponentFixture<MensajesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensajesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
