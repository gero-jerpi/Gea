import { newAppointment } from './../../models/appointment.model';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AppointmentService } from '../../services/appointment-service';
import { Appointment } from '../../models/appointment.model';

@Component({
  selector: 'app-form-appointment',
  imports: [ReactiveFormsModule],
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
    effect(()=>{
      this.appointmentToEdit = this.service.appointmentToUpdate();
      if(this.appointmentToEdit){
        this.isEditMode.set(true);
        this.form.patchValue({
          space: this.appointmentToEdit.space,
          surnameSpecialist: this.appointmentToEdit.surnameSpecialist,
          surnameCustomer: this.appointmentToEdit.surnameCustomer,
          date: this.appointmentToEdit.date,
          time: this.appointmentToEdit.time
      })
      }else{
        this.isEditMode.set(false);
        this.form.reset()
      }
    })
  }

  render(){

    if(this.form.invalid){
      return;
    }

    const newAppointment = this.form.getRawValue();

    if(this.isEditMode() && this.appointmentToEdit){
      const appointmentUpdated = {...this.appointmentToEdit, ...newAppointment}
      this.service.put(appointmentUpdated).subscribe(()=>{
        this.service.clearAppointmentToUpdate();
        console.log("Actualizado");
      })
    }else{
      this.service.post(newAppointment).subscribe(()=>{
        console.log("Agregado");
        this.form.reset()
      })
    }
  }
}
