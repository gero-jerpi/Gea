import { Component, inject, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppointmentService } from '../../services/appointment-service';
import { Appointment } from '../../models/appointment.model';

@Component({
  selector: 'app-form-appointment',
  imports: [],
  templateUrl: './form-appointment.html',
  styleUrl: './form-appointment.css',
})
export class FormAppointment {
  private fb = inject(FormBuilder);
  private service = inject(AppointmentService);

  private appointmentToEdit: null | Appointment = null;
  isEditMode = signal(false);


  form = this.fb.nonNullable.group({
    space: [""],
    surnameSpecialist: [""],
    surnameCustomer: [""],
    date: [""],
    time: [""]
  })


  constructor(){

  }







}
