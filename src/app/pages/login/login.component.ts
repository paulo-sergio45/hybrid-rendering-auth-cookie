import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { merge } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public errorMessageEmail = signal('');
  public errorMessagePassword = signal('');

  private readonly authService = inject(AuthService);

  readonly email = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.email,
      Validators.nullValidator,
    ],
  });
  readonly password = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(8),
      Validators.nullValidator,
    ],
  });

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());

    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  public updateErrorMessage(): void {
    if (this.email.hasError('required')) {
      this.errorMessageEmail.set('Você deve inserir um valor.');
    } else if (this.email.hasError('email')) {
      this.errorMessageEmail.set('Email inválido.');
    } else {
      this.errorMessageEmail.set('');
    }

    if (this.password.hasError('required')) {
      this.errorMessagePassword.set('Você deve inserir um valor.');
    } else if (this.password.hasError('minlength')) {
      this.errorMessagePassword.set('Senha com no mínimo 8 caracteres');
    } else {
      this.errorMessagePassword.set('');
    }
  }

  public onSubmit() {
    if (
      this.email &&
      this.email.valid &&
      this.password &&
      this.password.valid
    ) {
      this.authService.login({
        email: this.email.value,
        password: this.password.value,
      });
    }
  }
}
