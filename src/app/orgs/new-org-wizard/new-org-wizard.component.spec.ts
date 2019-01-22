import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrgWizardComponent } from './new-org-wizard.component';

describe('NewOrgWizardComponent', () => {
  let component: NewOrgWizardComponent;
  let fixture: ComponentFixture<NewOrgWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOrgWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOrgWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
