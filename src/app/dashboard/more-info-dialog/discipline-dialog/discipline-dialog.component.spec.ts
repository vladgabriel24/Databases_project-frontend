import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplineDialogComponent } from './discipline-dialog.component';

describe('DisciplineDialogComponent', () => {
  let component: DisciplineDialogComponent;
  let fixture: ComponentFixture<DisciplineDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisciplineDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisciplineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
