import { Component, inject } from '@angular/core';
import { ProfessionalService } from '../../../services/professional-service';
import { Professional } from '../../../models/professional.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-professional',
  imports: [],
  templateUrl: './list-professional.html',
  styleUrl: './list-professional.css',
})
export class ListProfessional {
  private service = inject(ProfessionalService);
  professionals = this.service.professionals;

  private router = inject(Router);

  delete(id: string){
    this.service.delete(id).subscribe(()=>{
      console.log("Profesional eliminado");
    })
  }

  put(professional: Professional){
    this.service.addProfessionalToEdit(professional);
    this.router.navigate(["/form-professional"])
  }
}
