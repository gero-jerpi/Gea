import { Routes } from '@angular/router';
import { ListCustomers } from './pages/list-customers/list-customers';
import { FormCustomer } from './pages/form-customer/form-customer';
import { ListProfessional } from './pages/list-professionals/list-professional';
import { FormProfessional } from './pages/form-professional/form-professional';
import { ListAppointment } from './pages/list-appointment/list-appointment';
import { FormAppointment } from './pages/form-appointment/form-appointment';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
  {path: 'list-customers', component: ListCustomers},
  {path: 'form-customer', component: FormCustomer},

  {path: 'list-professionals', component: ListProfessional},
  {path: 'form-professional', component: FormProfessional},

  {path: 'list-appointments', component: ListAppointment},
  {path: 'form-appointment', component: FormAppointment},

  {path: 'dashboard', component: Dashboard}
];
