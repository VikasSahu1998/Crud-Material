import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpdialogComponent } from './empdialog.component';

describe('EmpdialogComponent', () => {
  let component: EmpdialogComponent;
  let fixture: ComponentFixture<EmpdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpdialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
