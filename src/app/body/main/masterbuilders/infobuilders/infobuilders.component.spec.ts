import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfobuildersComponent } from './infobuilders.component';

describe('InfobuildersComponent', () => {
  let component: InfobuildersComponent;
  let fixture: ComponentFixture<InfobuildersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfobuildersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfobuildersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
