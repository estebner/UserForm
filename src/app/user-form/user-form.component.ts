import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

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
  separatorKeysCodes: number[] = [ENTER, COMMA];
  formCtrl = new FormControl();
  filteredRoles: Observable<Role[]>;
  allRoles: Role[] = [
      {
          "id": 45,
          "role": "IT Supervisor"
      },
      {
          "id": 26,
          "role": "Logistics Specialist"
      },
      {
          "id": 24,
          "role": "Accounts Receivable Analyst"
      },
      {
          "id": 52,
          "role": "Controller"
      },
      {
          "id": 10,
          "role": "Controller"
      },
      {
          "id": 5,
          "role": "Claims Manager"
      }
  ];
  roleNames: string[] = [];

  user: User;


  @ViewChild('roleInput') roleInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor() {
    this.filteredRoles = this.formCtrl.valueChanges.pipe(
        startWith(null),
        map((role: string | null) => role ? this._filter(role) : []));
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add value
      if ((value || '').trim()) {
        this.user.roles.push();
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.formCtrl.setValue(null);
    }
  }

  remove(role: Role): void {
    const index = this.user.roles.indexOf(role.id);

    if (index >= 0) {
      this.user.roles.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.user.roles.push(event.option.value.id);
    this.roleInput.nativeElement.value = '';
    this.formCtrl.setValue(null);
  }

  private _filter(value: string): Role[] {
    const filterValue = value.toLowerCase();

    return this.allRoles.filter(role => role.role.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit(){
    
  }
}
