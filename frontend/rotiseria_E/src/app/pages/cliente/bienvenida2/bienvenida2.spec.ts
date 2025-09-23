import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bienvenida2 } from './bienvenida2';

describe('Bienvenida2', () => {
  let component: Bienvenida2;
  let fixture: ComponentFixture<Bienvenida2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bienvenida2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bienvenida2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
