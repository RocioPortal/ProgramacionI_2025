import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienvenidaPage } from './bienvenida-page';

describe('BienvenidaPage', () => {
  let component: BienvenidaPage;
  let fixture: ComponentFixture<BienvenidaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BienvenidaPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BienvenidaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
