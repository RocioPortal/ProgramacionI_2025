import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrePanes } from './entre-panes';

describe('EntrePanes', () => {
  let component: EntrePanes;
  let fixture: ComponentFixture<EntrePanes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrePanes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrePanes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
