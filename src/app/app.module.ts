import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material/core';

import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserFormComponent } from './user-form/user-form.component';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input'; 
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button'; 

import { MatIconModule, MatIcon } from '@angular/material/icon'; 


@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    ReactiveFormsModule, 
    NoopAnimationsModule, 
    MatInputModule, 
    MatChipsModule, 
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    HttpClientModule
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
