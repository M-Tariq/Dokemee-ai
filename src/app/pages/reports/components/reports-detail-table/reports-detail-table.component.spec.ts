import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsDetailTableComponent } from './reports-detail-table.component';

describe('ReportsDetailTableComponent', () => {
  let component: ReportsDetailTableComponent;
  let fixture: ComponentFixture<ReportsDetailTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsDetailTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsDetailTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
