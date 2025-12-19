import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormProfessional } from './pages/professionals/form-professional/form-professional';
import { ListProfessional } from './pages/professionals/list-professionals/list-professional';
import { FormCustomer } from './pages/customers/form-customer/form-customer';
import { ListCustomers } from './pages/customers/list-customers/list-customers';
import { Sidebar } from './components/sidebar/sidebar';
import { Dashboard } from "./pages/dashboard/dashboard";
import { authGuard } from './services/auth-guard';
import { AuthService } from './services/auth-service';
import { Login } from './pages/login/login';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {


}
