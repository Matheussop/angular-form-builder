import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { FormioModule } from '@formio/angular';
import { BuilderComponent } from './builder/builder.component';
import { FormsComponent } from './forms/forms.component';
import { FORMS } from './forms.index';
import { FormioModule } from '../../../projects/angular-formio/src/formio.module';

@NgModule({
  imports: [
    CommonModule,
    FormioModule,
    RouterModule.forChild([{
      path: '',
      component: FormsComponent,
      children: FORMS
    }])
  ],
  declarations: [
    BuilderComponent,
    FormsComponent
  ],
  bootstrap: [
    FormsComponent
  ]
})
export class FormsModule { }
