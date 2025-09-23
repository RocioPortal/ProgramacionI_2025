import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bienvenida1 } from './bienvenida1';

describe('Bienvenida1', () => {
  let component: Bienvenida1;
  let fixture: ComponentFixture<Bienvenida1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bienvenida1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bienvenida1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
