import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBase } from './menu-base';

describe('MenuBase', () => {
  let component: MenuBase;
  let fixture: ComponentFixture<MenuBase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuBase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuBase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});