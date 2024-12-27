import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SignInFormComponentComponent } from "../core/components/auth/sign-in-form-component/sign-in-form-component.component";
import { SignUpFormComponentComponent } from "../core/components/auth/sign-up-form-component/sign-up-form-component.component";
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    SignInFormComponentComponent,
    SignUpFormComponentComponent
],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  tentativasFalhas: number = 0;
  maxTentativas: number = 3;
  isLoading: boolean = false;
  singUp: boolean = false
  singIn: boolean = true
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]] 
    });
  }
  singUpForm(){
    this.singUp = true
    this.singIn = false
  }
  openSignUpDialog(): void {
    this.dialog.open(SignUpFormComponentComponent, {
      width: '500px',  // Você pode ajustar a largura do dialog conforme necessário
    });
  }
  singInForm() {
    this.singIn = true
    if (this.form.valid) {
      return;
    } else {
      console.log('Form is invalid');
      this.tentativasFalhas++;
      this.form.markAllAsTouched(); 
    }
  }
}
