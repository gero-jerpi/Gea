import { Customer } from './../../models/customer.model';
import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer-service';

@Component({
  selector: 'app-list-customers',
  imports: [],
  templateUrl: './list-customers.html',
  styleUrl: './list-customers.css',
})
export class ListCustomers {
  private service = inject(CustomerService);
  customers = this.service.customers;

  delete(id: string){
    this.service.delete(id).subscribe(()=>{
      console.log("Eliminado!");
    })
  }

  update(customer: Customer){
    this.service.addCustomerToEdit(customer);
  }

}
