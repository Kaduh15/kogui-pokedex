import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonNavigate } from './button-navigate';

describe('ButtonNavigate', () => {
  let component: ButtonNavigate;
  let fixture: ComponentFixture<ButtonNavigate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonNavigate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonNavigate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
