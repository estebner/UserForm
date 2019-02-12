import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm, Form, FormGroup, AbstractControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete}  from '@angular/material';
import { Observable, pipe } from 'rxjs';
import { switchMap, map, startWith, tap, debounceTime } from 'rxjs/operators';
import { RoleService } from '../role.service'
import { UserService } from '../user.service'

import {ErrorStateMatcher} from '@angular/material/core';
import { Role } from "./role";
import { User } from "./user";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  isLoading = false;
  submitting = false;
  submitted = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  roleFormCtrl = new FormControl('', []);
  nameFormCtrl = new FormControl('', [Validators.required]);
  chipFormCtrl = new FormControl('', [Validators.required]);
  filteredRoles: Observable<Role[]>;
  roles: Role[] = [];

  userForm: FormGroup;

  userAdded: User = null;

  user: User = {name: '', roles: []};

  matcher = new MyErrorStateMatcher();

  @ViewChild('roleInput') roleInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private roleService: RoleService, private userService: UserService) {
    this.userForm = new FormGroup({
        role: this.roleFormCtrl,
        name: this.nameFormCtrl,
        chip: this.chipFormCtrl
    })

    this.filteredRoles = this.roleFormCtrl.valueChanges.pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
        startWith(null),
        switchMap((role: string | null) => role == '' ? [] : this.roleService.getRoles(role, this.user.roles)),
        tap(() => this.isLoading = false)
    );
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      //do nothing
    }
  }

  remove(role: Role): void {
    const index = this.roles.indexOf(role);
    let id = role.id;

    if (index >= 0) {
      this.roles.splice(index, 1);
    }
    if(this.user.roles.indexOf(id) >= 0){
        this.user.roles.splice(this.user.roles.indexOf(id));
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.roles.push(event.option.value);
    this.user.roles.push(event.option.value.id)
    this.roleInput.nativeElement.value = '';
    this.roleFormCtrl.setValue(null);
  }

  submit(): void {
      //don't allow multiple clicks
      if(this.submitting)
        return;
      this.submitted = true;
      if(this.user.name.length>0 && this.user.roles.length>0){
      this.submitting = true;        
        this.userService.addUser(this.user).pipe().subscribe(user => {
            this.resetForm(this.userForm);
            this.roles = [];
            this.user = {name: '', roles: []};
            this.submitting = false;
        });
      }
    
  }

  resetForm(formGroup: FormGroup) {
    let control: AbstractControl = null;
    this.submitted = false;
    formGroup.reset();
    formGroup.markAsUntouched();
    Object.keys(formGroup.controls).forEach((name) => {
      control = formGroup.controls[name];
      control.setErrors(null);
    });
  }

  ngOnInit(){
    
  }
}
