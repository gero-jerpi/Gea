import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
