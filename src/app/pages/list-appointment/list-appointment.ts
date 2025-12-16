import { Component, inject } from '@angular/core';
import { AppointmentService } from '../../services/appointment-service';
import { Appointment } from '../../models/appointment.model';

@Component({
  selector: 'app-list-appointment',
  imports: [],
  templateUrl: './list-appointment.html',
  styleUrl: './list-appointment.css',
})
export class ListAppointment {
  private appointmentService = inject(AppointmentService);
  appointments = this.appointmentService.appointments;

  delete(id: string){
    this.appointmentService.delete(id).subscribe(()=>{
      console.log("Eliminado");
    })
  }

  update(appointment: Appointment){
    this.appointmentService.addAppointmentToUpdate(appointment);
  }

}
