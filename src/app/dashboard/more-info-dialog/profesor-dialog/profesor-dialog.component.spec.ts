import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorDialogComponent } from './profesor-dialog.component';

describe('ProfesorDialogComponent', () => {
  let component: ProfesorDialogComponent;
  let fixture: ComponentFixture<ProfesorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfesorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
