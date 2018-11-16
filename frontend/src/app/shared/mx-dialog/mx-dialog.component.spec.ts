import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MxDialogComponent } from './mx-dialog.component';

describe('MxDialogComponent', () => {
  let component: MxDialogComponent;
  let fixture: ComponentFixture<MxDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MxDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MxDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
