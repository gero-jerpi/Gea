import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Sidebar } from '../sidebar/sidebar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [Sidebar, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
 private service = inject(AuthService);
  isLoggedIn = this.service.isLoggedIn();

}
