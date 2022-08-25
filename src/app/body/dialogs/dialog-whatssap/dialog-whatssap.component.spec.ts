import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogWhatssapComponent } from './dialog-whatssap.component';

describe('DialogWhatssapComponent', () => {
  let component: DialogWhatssapComponent;
  let fixture: ComponentFixture<DialogWhatssapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogWhatssapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogWhatssapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
