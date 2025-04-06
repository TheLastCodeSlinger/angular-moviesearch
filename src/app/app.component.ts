import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { Observable } from 'rxjs';
import { SidebarDesktopComponent } from './components/sidebars/sidebar-desktop/sidebar-desktop.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [SidebarDesktopComponent, RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  Api = inject(ApiService);
  router = inject(Router);
  title = 'angular-movie';
  protected api = inject(ApiService);
  isLoading$?: Observable<number>;

  ngOnInit(): void {
    this.router.navigate(['/Discover/Popular']);
  }
}
