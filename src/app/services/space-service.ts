import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { newSpace, Space } from '../models/space.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpaceService {

  // API
  private url = 'http://localhost:3000/space';

  // Variables
  private spacesSignal = signal<Space[]>([]);
  public spaces = this.spacesSignal.asReadonly();

  // Variables && Methods to edit
  private spaceToUpdateSignal = signal<Space | null>(null);
  public spaceToUpdate = this.spaceToUpdateSignal.asReadonly()

  addElementToEdit(spaceToEdit: Space){
    this.spaceToUpdateSignal.set(spaceToEdit);
  }

  clearElementToEdit(){
    this.spaceToUpdateSignal.set(null);
  }

  // CONSTRUCTOR
  constructor(private http: HttpClient){
    this.read();
  }

  // CRUD
  create(newSpace: newSpace): Observable<Space>{
    return this.http.post<Space>(this.url, newSpace).pipe(
      tap(createdSpace =>
        this.spacesSignal.update(spaces =>
          [...spaces, createdSpace])
      )
    )
  }

  read(){
    this.http.get<Space[]>(this.url).subscribe((data)=>{
      this.spacesSignal.set(data);
    })
  }

  update(spaceToUpdate: Space): Observable<Space>{
    return this.http.put<Space>(`${this.url}/${spaceToUpdate.id}`, spaceToUpdate).pipe(
      tap(spaceUpdated =>
        this.spacesSignal.update(spaces =>
          spaces.map(space =>
            space.id === spaceUpdated.id ? spaceUpdated : space
          )
        )
      )
    )
  }

  delete(id: string): Observable<void>{
    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      tap(()=>
        this.spacesSignal.update(spaces =>
          spaces.filter(space => space.id !== id)
        )
      )
    )
  }

}
