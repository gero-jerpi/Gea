import { Appointment, newAppointment } from './../models/appointment.model';
import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private urlApi = 'http://localhost:3000/appointment';

  private appointmentsSignal = signal<Appointment[]>([]);
  public appointments = this.appointmentsSignal.asReadonly();

  private appointmentToUpdateSignal = signal<Appointment | null>(null);
  public appointmentToUpdate = this.appointmentToUpdateSignal.asReadonly();

  size = computed(() => this.appointments().length);

  clearAppointmentToUpdate() {
    this.appointmentToUpdateSignal.set(null);
  }

  addAppointmentToUpdate(appointment: Appointment) {
    this.appointmentToUpdateSignal.set(appointment);
  }

  constructor(private http: HttpClient) {
    this.get();
  }

  get() {
    this.http.get<Appointment[]>(this.urlApi).subscribe((data) => {
      this.appointmentsSignal.set(data);
    });
  }

  post(newAppointment: newAppointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.urlApi, newAppointment).pipe(
      tap((appointmentCreated) => {
        this.appointmentsSignal.update((appointments) => [...appointments, appointmentCreated]);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.urlApi}/${id}`).pipe(
      tap(() => {
        this.appointmentsSignal.update((appointments) =>
          appointments.filter((appointment) => appointment.id !== id)
        );
      })
    );
  }

  put(appointmentToUpdate: Appointment): Observable<Appointment> {
    return this.http
      .put<Appointment>(`${this.urlApi}/${appointmentToUpdate.id}`, appointmentToUpdate)
      .pipe(
        tap((updatedAppointment) => {
          this.appointmentsSignal.update((appointments) =>
            appointments.map((appointment) =>
              appointment.id === updatedAppointment.id ? updatedAppointment : appointment
            )
          );
        })
      );
  }
}
