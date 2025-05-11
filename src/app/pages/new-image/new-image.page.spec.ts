import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewImagePage } from './new-image.page';

describe('NewImagePage', () => {
  let component: NewImagePage;
  let fixture: ComponentFixture<NewImagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
