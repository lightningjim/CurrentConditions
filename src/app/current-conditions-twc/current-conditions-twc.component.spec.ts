import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentConditionsTwcComponent } from './current-conditions-twc.component';

describe('CurrentConditionsTwcComponent', () => {
  let component: CurrentConditionsTwcComponent;
  let fixture: ComponentFixture<CurrentConditionsTwcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentConditionsTwcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentConditionsTwcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
