import { Component, inject, OnInit } from '@angular/core';
import { categories } from '../../../types/api-types';
import { RouterLink } from '@angular/router';
import { GenreListService } from '../../../services/genreList.service';

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
}
