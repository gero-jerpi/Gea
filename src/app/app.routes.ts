import { Routes } from '@angular/router';
import { ListCustomers } from './pages/customers/list-customers/list-customers';
import { FormCustomer } from './pages/customers/form-customer/form-customer';
import { ListProfessional } from './pages/professionals/list-professionals/list-professional';
import { FormProfessional } from './pages/professionals/form-professional/form-professional';
import { ListAppointment } from './pages/appointments/list-appointment/list-appointment';
import { FormAppointment } from './pages/appointments/form-appointment/form-appointment';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import { authGuard } from './services/auth-guard';
import { Layout } from './components/layout/layout';

export const routes: Routes = [
  { path: '', component: Login },

  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: 'list-customers', component: ListCustomers },
      { path: 'form-customer', component: FormCustomer },

      { path: 'list-professionals', component: ListProfessional },
      { path: 'form-professional', component: FormProfessional },

      { path: 'list-appointments', component: ListAppointment },
      { path: 'form-appointment', component: FormAppointment },

      { path: 'dashboard', component: Dashboard },
    ],
  },

  { path: '**', redirectTo: 'login' },
];
