import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { newProfessional, Professional } from '../models/professional.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalService {
  // API URL
  private apiUrl = 'http://localhost:3000/professional';

  // VARIABLES
  private professionalsSignal = signal<Professional[]>([]);
  public professionals = this.professionalsSignal.asReadonly()

  private professionalToEditSignal = signal<Professional | null>(null)
  public professionalToEdit = this.professionalToEditSignal.asReadonly()

  addProfessionalToEdit(professional: Professional){
    this.professionalToEditSignal.set(professional);
  }

  clearProfessionalToEdit(){
    this.professionalToEditSignal.set(null);
  }


  // CONSTRUCTOR
  constructor(private http: HttpClient) {
    this.get();
  }

  // CRUD
  get() {
    this.http.get<Professional[]>(this.apiUrl).subscribe((data) => {
      this.professionalsSignal.set(data);
    });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.professionalsSignal.update((professionals) =>
          professionals.filter((p) => p.id !== id)
        );
      })
    );
  }

  post(newProfessional: newProfessional): Observable<Professional> {
    return this.http.post<Professional>(this.apiUrl, newProfessional).pipe(
      tap((createdProfessional) => {
        this.professionalsSignal.update(professionals => [...professionals, createdProfessional]);
      })
    );
  }

  put(professionalToUpdate: Professional): Observable<Professional>{
    return this.http.put<Professional>(`${this.apiUrl}/${professionalToUpdate.id}`, professionalToUpdate).pipe(
      tap(updatedProfessional=>{
        this.professionalsSignal.update(professionals =>
          professionals.map(p => p.id === updatedProfessional.id ? updatedProfessional : p)
        )
      })
    )
  }
}
