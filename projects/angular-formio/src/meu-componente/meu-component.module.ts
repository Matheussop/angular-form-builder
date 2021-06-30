import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeuComponenteComponent } from './meu-componente.component';
import { registerMeuComponente } from './meu-componente.formio';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    MeuComponenteComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
  ],
  exports: [
    MeuComponenteComponent
  ]
})
export class MeuComponentModule { 
  constructor(injector: Injector) {
    registerMeuComponente(injector);
  }
}
