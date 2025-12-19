import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

private fb = inject(FormBuilder);
private serviceAuth = inject(AuthService);
private router = inject(Router);

form = this.fb.nonNullable.group({
  name: [""],
  password: [""]
})


auth(){
  if(this.form.invalid){
    return;
  }

  console.log("hola");


  const user = this.form.getRawValue();

  if(user.name === 'admin' && user.password === 'admin'){
    this.serviceAuth.login();
    this.router.navigate(['/dashboard'])
  }
}

}
