import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCurriculumComponent } from './get-curriculum.component';

describe('GetCurriculumComponent', () => {
  let component: GetCurriculumComponent;
  let fixture: ComponentFixture<GetCurriculumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetCurriculumComponent]
    });
    fixture = TestBed.createComponent(GetCurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
