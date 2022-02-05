import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductsManagementBoxComponent } from './admin-products-management-box.component';

describe('AdminProductsManagementBoxComponent', () => {
  let component: AdminProductsManagementBoxComponent;
  let fixture: ComponentFixture<AdminProductsManagementBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductsManagementBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductsManagementBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
