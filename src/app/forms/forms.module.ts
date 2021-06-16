import { NgModule, Injector } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { FormioModule } from '@formio/angular';
import { BuilderComponent } from './builder/builder.component';
import { FormsComponent } from './forms/forms.component';
import { FORMS } from './forms.index';
import { FormioModule } from '../../../projects/angular-formio/src/formio.module';
import { registerMeuComponente } from '../meu-componente/meu-componente.formio';
import { registerEstadoCidadeComponent } from '../estado-cidade/estado-cidade.formio';
import { EstadoCidadeComponent } from '../estado-cidade/estado-cidade.component';
import { MeuComponenteComponent } from '../meu-componente/meu-componente.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormioModule,
    RouterModule.forChild([{
      path: '',
      component: FormsComponent,
      children: FORMS
    }]),
    ReactiveFormsModule
  ],
  declarations: [
    BuilderComponent,
    FormsComponent,
    MeuComponenteComponent,
    EstadoCidadeComponent
  ],
  bootstrap: [
    FormsComponent
  ],
  entryComponents: []
})
export class FormsModule { 
  constructor(injector: Injector) {
    registerMeuComponente(injector);
    registerEstadoCidadeComponent(injector);
  }

}
