import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterbuildersComponent } from './masterbuilders.component';

describe('MasterbuildersComponent', () => {
  let component: MasterbuildersComponent;
  let fixture: ComponentFixture<MasterbuildersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterbuildersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterbuildersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
