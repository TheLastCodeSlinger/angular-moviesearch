import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsContainerComponent } from './movie-details-container.component';

describe('MoviedetailsComponent', () => {
  let component: MovieDetailsContainerComponent;
  let fixture: ComponentFixture<MovieDetailsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetailsContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
