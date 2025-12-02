import { Component, effect, inject, signal } from '@angular/core';
import { SpaceService } from '../../services/space-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Space } from '../../models/space.model';

@Component({
  selector: 'app-space-form',
  imports: [ReactiveFormsModule],
  templateUrl: './space-form.html',
  styleUrl: './space-form.css',
})
export class SpaceForm {
  // VARIABLES
  private service = inject(SpaceService);
  private fb = inject(FormBuilder);
  private spaceToEdit: Space | null = null;
  isEditMode = signal(false);

  // FORM
  form = this.fb.nonNullable.group({
    name: ["", Validators.required],
    type: ["", Validators.required]
  })

  // CONSTRUCTOR
  constructor(){
    effect(()=>{
      this.spaceToEdit = this.service.spaceToUpdate();
      if(this.spaceToEdit){
        this.isEditMode.set(true);
        this.form.patchValue({
          name: this.spaceToEdit.name,
          type: this.spaceToEdit.type
        })
      }else{
        this.isEditMode.set(false);
        this.form.reset();
      }
    })
  }

  // RENDER
  render(){
    if(this.form.invalid){
      return;
    }

    const newSpace = this.form.getRawValue();

    if(this.spaceToEdit && this.isEditMode()){
      const updateSpace = {...this.spaceToEdit, ...newSpace}
      this.service.update(updateSpace).subscribe(()=>{
        this.service.clearElementToEdit();
        console.log("Elemento eliminado");
        this.form.reset()
      })
    }else{
      this.service.create(newSpace).subscribe(()=>{
        console.log("Elemento agregado");
        this.form.reset();
      })
    }
  }
}
