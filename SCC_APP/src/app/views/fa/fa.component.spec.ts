import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaComponent } from './fa.component';

describe('FaComponent', () => {
  let component: FaComponent;
  let fixture: ComponentFixture<FaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
