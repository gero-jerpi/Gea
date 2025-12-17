import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  showAside = false;
  isDesktop = false;

  isOpen = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // 🔑 SOLO cerrar en mobile
        if (!this.isDesktop) {
          this.showAside = false;
        }
      });
  }


  ngOnInit() {
    this.checkScreen();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreen();
  }

  checkScreen() {
    this.isDesktop = window.innerWidth >= 768;
    this.showAside = this.isDesktop ? true : false;
  }

  close() {
    if (!this.isDesktop) {
      this.showAside = false;
    }
  }

  open() {
    if (!this.isDesktop) {
      this.showAside = true;
    }
  }
}
