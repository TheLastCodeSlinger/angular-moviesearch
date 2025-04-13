import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesContainerComponent } from './movies-container.component';

describe('MoviesComponent', () => {
  let component: MoviesContainerComponent;
  let fixture: ComponentFixture<MoviesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
