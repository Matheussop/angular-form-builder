import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormioModule } from 'projects/angular-formio/src';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    FormioModule
  ],
  exports: [
    FormioModule
  ]
})
export class SharedModule { }
