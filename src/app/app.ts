import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormProfessional } from './pages/form-professional/form-professional';
import { ListProfessional } from './pages/list-professionals/list-professional';
import { FormCustomer } from './pages/form-customer/form-customer';
import { ListCustomers } from './pages/list-customers/list-customers';
import { Sidebar } from './components/sidebar/sidebar';
import { Dashboard } from "./pages/dashboard/dashboard";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
