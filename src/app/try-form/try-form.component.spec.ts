import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TryFormComponent } from './try-form.component';

describe('TryFormComponent', () => {
  let component: TryFormComponent;
  let fixture: ComponentFixture<TryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
