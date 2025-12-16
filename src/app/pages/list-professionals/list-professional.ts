import { Component, inject } from '@angular/core';
import { ProfessionalService } from '../../services/professional-service';
import { Professional } from '../../models/professional.model';

@Component({
  selector: 'app-list-professional',
  imports: [],
  templateUrl: './list-professional.html',
  styleUrl: './list-professional.css',
})
export class ListProfessional {
  private service = inject(ProfessionalService);
  professionals = this.service.professionals;

  delete(id: string){
    this.service.delete(id).subscribe(()=>{
      console.log("Profesional eliminado");
    })
  }

  put(professional: Professional){
    this.service.addProfessionalToEdit(professional);
  }
}
