import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLinqComponent } from './view-linq.component';

describe('ViewLinqComponent', () => {
  let component: ViewLinqComponent;
  let fixture: ComponentFixture<ViewLinqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLinqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLinqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
