import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBoton } from './menu-boton';

describe('MenuBoton', () => {
  let component: MenuBoton;
  let fixture: ComponentFixture<MenuBoton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuBoton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuBoton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
