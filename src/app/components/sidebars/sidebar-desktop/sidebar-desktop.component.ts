import { Component, inject, OnInit } from '@angular/core';
import { categories, CategoryType, Genre } from '../../../types/api-types';
import { RouterLink } from '@angular/router';
import { GenreListService } from '../../../services/genreList.service';
import { DiscoverGenre } from '../../../types/app-types';

@Component({
  selector: 'app-sidebar-desktop',
  imports: [RouterLink],
  templateUrl: './sidebar-desktop.component.html',
  styleUrl: './sidebar-desktop.component.css',
  standalone: true,
})
export class SidebarDesktopComponent implements OnInit {
  genreService = inject(GenreListService);
  categories: typeof categories = categories;

  ngOnInit(): void {
    this.genreService.fetchGenreList();
  }

  setCategory(categoryItem: Genre | CategoryType, type: DiscoverGenre) {
    this.genreService.setActiveCategory(categoryItem, type);
  }
}
