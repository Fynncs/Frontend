import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up-form-component',
  templateUrl: './sign-up-form-component.component.html',
  styleUrls: ['./sign-up-form-component.component.scss'],
  imports: [
        CommonModule,
        MatFormFieldModule, 
        MatInputModule,
        MatButtonModule,
        MatIconModule, 
        ReactiveFormsModule,
  ],
})
export class SignUpFormComponentComponent {
  form!: FormGroup;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  @Output() goBackToLogin = new EventEmitter<void>();
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      nationality: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      profession: ['', Validators.required],
      academicBackground: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.passwordMatchValidator });
  }
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      group.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      group.get('confirmPassword')?.setErrors(null);
      return null;
    }
  }
  changeToSingIn() {
    this.goBackToLogin.emit(); 
  }
  onSubmit() {
    if (this.form.valid) {
      return;
    } else {
      console.log('Form is invalid');
      this.form.markAllAsTouched(); 
    }
  }
}
