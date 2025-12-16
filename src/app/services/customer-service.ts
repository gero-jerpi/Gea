import { HttpClient } from '@angular/common/http';
import { Customer, newCustomer } from './../models/customer.model';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'http://localhost:3000/customers';

  private customersSignal = signal<Customer[]>([]);
  public customers = this.customersSignal.asReadonly();

  private customerToEditSignal = signal<Customer | null>(null)
  public customerToEdit = this.customerToEditSignal.asReadonly()

  clearCustomerToEdit(){
    this.customerToEditSignal.set(null);
  }

  addCustomerToEdit(customer: Customer){
    this.customerToEditSignal.set(customer)
  }

  constructor(private http: HttpClient) {
    this.get();
  }

  get() {
    this.http.get<Customer[]>(this.apiUrl).subscribe((data) => {
      this.customersSignal.set(data);
    });
  }

  post(newCustomer: newCustomer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, newCustomer).pipe(
      tap((customerCreated) => {
        this.customersSignal.update((customers) => [...customers, customerCreated]);
      })
    );
  }

  delete(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(() =>
          this.customersSignal.update((customers) =>
            customers.filter((customer) => customer.id !== id)
          )
        )
      );
  }

  put(customerToUpdate: Customer): Observable<Customer> {
    return this.http
      .put<Customer>(`${this.apiUrl}/${customerToUpdate.id}`, customerToUpdate)
      .pipe(
        tap((customerUpdated) =>
          this.customersSignal.update((customers) =>
            customers.map((customer) =>
              customer.id === customerUpdated.id ? customerUpdated : customer
            )
          )
        )
      );
  }
}
