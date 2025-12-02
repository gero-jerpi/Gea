export interface Appointment{
  id: string,
  idSpace: string,
  idSpecialist: string,
  date: string,
  time: string
  idCustomer: string;
}

export interface newAppointment{
  idSpace: string,
  idSpecialist: string,
  date: string,
  time: string
  idCustomer: string;
}
