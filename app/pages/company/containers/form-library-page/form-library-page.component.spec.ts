import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLibraryPageComponent } from './form-library-page.component';

describe('FormLibraryPageComponent', () => {
  let component: FormLibraryPageComponent;
  let fixture: ComponentFixture<FormLibraryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLibraryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLibraryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
