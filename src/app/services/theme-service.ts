import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkModeSignal = signal(false);

  toggle(){
    this.darkModeSignal.update(v => !v)

    document.body.classList.toggle('dark-theme', this.darkModeSignal())
  }
}
