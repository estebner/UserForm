import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete}  from '@angular/material';
import { Observable, pipe } from 'rxjs';
import { switchMap, map, startWith, tap, debounceTime, finalize } from 'rxjs/operators';
import { RoleService } from '../role.service'
import { UserService } from '../user.service'

import { MatInputModule } from '@angular/material/input'; 

import { Role } from "./role";
import { User } from "./user";

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
  separatorKeysCodes: number[] = [ENTER, COMMA];
  formCtrl = new FormControl('', [Validators.required]);
  filteredRoles: Observable<Role[]>;
  roles: Role[] = [];

  userAdded: User = null;

  user: User = {name: '', roles: []};


  @ViewChild('roleInput') roleInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private roleService: RoleService, private userService: UserService) {
    this.filteredRoles = this.formCtrl.valueChanges.pipe(
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
    console.log(event);
    this.roleInput.nativeElement.value = '';
    this.formCtrl.setValue(null);
  }

  submit(): void {
      //if valid
      if(this.user.name.length>0 && this.user.roles.length>0){
          this.userService.addUser(this.user).pipe().subscribe(user => {
              this.user = {name: '', roles: []};
              this.roles = [];
          });
      }
    
  }

  ngOnInit(){
    
  }
}
