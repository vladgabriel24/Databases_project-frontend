import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieDialogComponent } from './serie-dialog.component';

describe('SerieDialogComponent', () => {
  let component: SerieDialogComponent;
  let fixture: ComponentFixture<SerieDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SerieDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SerieDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
