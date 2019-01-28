import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactCreatorComponent } from './contact-creator.component';

describe('ContactCreatorComponent', () => {
  let component: ContactCreatorComponent;
  let fixture: ComponentFixture<ContactCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
