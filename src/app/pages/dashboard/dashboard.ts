import { Component, inject } from '@angular/core';
import { AppointmentService } from '../../services/appointment-service';
import { CustomerService } from '../../services/customer-service';
import { ProfessionalService } from '../../services/professional-service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private serviceAppointments = inject(AppointmentService);
  private serviceCustomers = inject(CustomerService);
  private serviceProfessionals = inject(ProfessionalService);

  appointmentsCount = this.serviceAppointments.size;
  customersCount = this.serviceCustomers.size;
  professionalsCount = this.serviceProfessionals.size

  appointments = this.serviceAppointments.appointments;
  customers = this.serviceCustomers.customers;



}
