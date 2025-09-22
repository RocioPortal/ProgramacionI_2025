import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Caserito } from './caserito';

describe('Caserito', () => {
  let component: Caserito;
  let fixture: ComponentFixture<Caserito>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Caserito]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Caserito);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
