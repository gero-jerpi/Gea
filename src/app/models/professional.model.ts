export interface Specialist{
  id: string,
  name: string,
  surname: string;
  dni: string,
  phone: number,
  rol: 'Masajista' | 'Profesor de yoga' /// More can be added in the future
}

export interface newSpecialist{
  name: string,
  surname: string;
  dni: string,
  phone: number,
  rol: 'Masajista' | 'Profesor de yoga'
}

