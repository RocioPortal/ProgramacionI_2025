import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Volver } from './volver';

describe('Volver', () => {
  let component: Volver;
  let fixture: ComponentFixture<Volver>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Volver]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Volver);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
