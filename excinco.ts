import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  template: `
    <form [formGroup]="userForm" (ngSubmit)="doSubmit()">
        <input type="email" formControlName="email" placeholder="email">
        <input type="text" formControlName="name" placeholder="name">
        <input type="date" formControlName="birthday" placeholder="birthday">
        <div formGroupName="address">
          <input type="number" formControlName="zip" placeholder="zip">
          <input type="text" formControlName="city" placeholder="city">
        </div>
        <button type="submit">Submit</button>
    </form>
  `
})
export class AppUserForm {

  @Output()
  event = new EventEmitter<{ email: string; name: string; birthday?: Date; address: { zip: number; city: string; };}>();

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.maxLength(128)]],
      birthday: [''],
      address: this.formBuilder.group({
        zip: ['', [Validators.required]],
        city: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]]
      })
    });
  }

  doSubmit(): void {
    if (this.userForm.valid) {
      this.event.emit(this.userForm.value);
    }
  }
}
