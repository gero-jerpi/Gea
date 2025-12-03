import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormProfessional } from './pages/form-professional/form-professional';
import { ListProfessional } from './pages/list-professional/list-professional';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormProfessional, ListProfessional],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
