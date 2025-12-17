import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfessionalService } from '../../../services/professional-service';
import { Professional } from '../../../models/professional.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-professional',
  imports: [ReactiveFormsModule],
  templateUrl: './form-professional.html',
  styleUrl: './form-professional.css',
})
export class FormProfessional {
  // VARIABLES
  private fb = inject(FormBuilder);
  private service = inject(ProfessionalService);
  private router = inject(Router)

  private professionalToEdit: Professional | null = null;
  isEditMode = signal(false);

  // FORM
  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    phone: [0, Validators.required],
    rol: ['', Validators.required],
  });

  // CONSTRUCTOR
  constructor() {
    effect(() => {
      this.professionalToEdit = this.service.professionalToEdit();
      if (this.professionalToEdit) {
        this.isEditMode.set(true);
        this.form.patchValue({
          name: this.professionalToEdit.name,
          surname: this.professionalToEdit.surname,
          phone: this.professionalToEdit.phone,
          rol: this.professionalToEdit.rol,
        });
      } else {
        this.isEditMode.set(false);
        this.form.reset();
      }
    });
  }

  // RENDER
  render() {
    if (this.form.invalid) {
      return;
    }

    const newProfessional = this.form.getRawValue();

    if (this.isEditMode() && this.professionalToEdit) {
      const updateProfessional = { ...this.professionalToEdit, ...newProfessional };
      this.service.put(updateProfessional).subscribe(() => {
        console.log('Profesional actualizado');
        this.service.clearProfessionalToEdit();
        this.form.reset();
        this.router.navigate(['/list-professionals'])
      });
    } else {
      this.service.post(newProfessional).subscribe(() => {
        console.log('Profesional creado');
        this.form.reset();
        this.router.navigate(['/list-professionals'])
      });
    }
  }
}
