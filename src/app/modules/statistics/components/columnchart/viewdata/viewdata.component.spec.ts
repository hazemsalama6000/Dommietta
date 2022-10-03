/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ViewdataComponent } from './viewdata.component';

describe('ViewdataComponent', () => {
  let component: ViewdataComponent;
  let fixture: ComponentFixture<ViewdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
