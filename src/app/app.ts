import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpaceForm } from './pages/space-form/space-form';
import { SpaceList } from './pages/space-list/space-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SpaceForm, SpaceList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
