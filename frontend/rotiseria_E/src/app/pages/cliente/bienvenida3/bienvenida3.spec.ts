import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bienvenida3 } from './bienvenida3';

describe('Bienvenida3', () => {
  let component: Bienvenida3;
  let fixture: ComponentFixture<Bienvenida3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bienvenida3]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bienvenida3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
