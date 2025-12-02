
import { Component, inject } from '@angular/core';
import { SpaceService } from '../../services/space-service';
import { Space } from '../../models/space.model';

@Component({
  selector: 'app-space-list',
  imports: [],
  templateUrl: './space-list.html',
  styleUrl: './space-list.css',
})
export class SpaceList {
  // Variables
  private service = inject(SpaceService);
  spaces = this.service.spaces;

  // Methods
  delete(id: string) {
    this.service.delete(id).subscribe(() => {
      console.log('Eliminado');
    });
  }

  update(space: Space) {
    this.service.addElementToEdit(space);
  }
}
