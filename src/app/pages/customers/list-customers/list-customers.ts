import { Customer } from '../../../models/customer.model';
import { Component, inject } from '@angular/core';
import { CustomerService } from '../../../services/customer-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-customers',
  imports: [],
  templateUrl: './list-customers.html',
  styleUrl: './list-customers.css',
})
export class ListCustomers {
  private service = inject(CustomerService);
  customers = this.service.customers;

  private router = inject(Router)

  delete(id: string){
    this.service.delete(id).subscribe(()=>{
      console.log("Eliminado!");
    })
  }

  update(customer: Customer){
    this.service.addCustomerToEdit(customer);
    this.router.navigate(["/form-customer"])
  }

}
