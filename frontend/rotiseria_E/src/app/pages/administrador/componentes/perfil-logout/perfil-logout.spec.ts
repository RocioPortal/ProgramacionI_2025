import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilLogout } from './perfil-logout';

describe('PerfilLogout', () => {
  let component: PerfilLogout;
  let fixture: ComponentFixture<PerfilLogout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilLogout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilLogout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
