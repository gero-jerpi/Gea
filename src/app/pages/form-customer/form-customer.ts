import { newCustomer } from './../../models/customer.model';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer-service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-form-customer',
  imports: [ReactiveFormsModule],
  templateUrl: './form-customer.html',
  styleUrl: './form-customer.css',
})
export class FormCustomer {
  private fb = inject(FormBuilder);
  private service = inject(CustomerService);

  private customerToEdit: null | Customer = null;
  isEditMode = signal(false);

  form = this.fb.nonNullable.group({
    name: ["", Validators.required],
    surname: ["", Validators.required],
    dni: [0, Validators.required],
    phone: [0, Validators.required],
  })

  constructor(){
    effect(()=>{
      this.customerToEdit = this.service.customerToEdit();
      if(this.customerToEdit){
        this.isEditMode.set(true);
        this.form.patchValue({
          name: this.customerToEdit.name,
          surname: this.customerToEdit.surname,
          phone: this.customerToEdit.phone
        })
      }else{
        this.isEditMode.set(false);
        this.form.reset();
      }
    })
  }

  render(){
    if(this.form.invalid){
      return;
    }

    const newCustomer = this.form.getRawValue();

    if(this.customerToEdit && this.isEditMode()){
      const updateCustomer = {...this.customerToEdit, newCustomer};
      this.service.put(updateCustomer).subscribe(()=>{
        console.log("Actualizado");
        this.service.clearCustomerToEdit()
        this.form.reset();
      })
    }else{
      this.service.post(newCustomer).subscribe(()=>{
        console.log("Agregado");
        this.form.reset();
      })

    }
  }

}
