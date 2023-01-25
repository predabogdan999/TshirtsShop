import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupByCategoriesComponent } from './group-by-categories.component';

describe('GroupByCategoriesComponent', () => {
  let component: GroupByCategoriesComponent;
  let fixture: ComponentFixture<GroupByCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupByCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupByCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
