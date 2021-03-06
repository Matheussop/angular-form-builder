import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Formio, FormioAppConfig } from '@formio/angular';
// import premium from '@formio/premium';
// Formio.use(premium);
import { FormioGrid } from '@formio/angular/grid';
import { FormioAuthService, FormioAuthConfig } from '@formio/angular/auth';
import { FormioResources } from '@formio/angular/resource';
import { PrismService } from './Prism.service';
import { FormioModule } from './../../projects/angular-formio/src/formio.module';
import { AppConfig } from './config';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {environment} from '../environments/environment'
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormListComponent } from './form-list/form-list.component';
import { FormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'; // added this
import { HttpClientModule } from '@angular/common/http';
import { registerMeuComponente } from './meu-componente/meu-componente.formio';
import { MeuComponenteComponent } from './meu-componente/meu-componente.component';
import { SubFormComponent } from './sub-form/sub-form.component';


// Make sure we use fontawesome everywhere in Form.io renderers.
(Formio as any).icons = 'fontawesome';

/**
 * Import the Custom component CheckMatrix.
 */
// import './components/CheckMatrix';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormListComponent,
    MeuComponenteComponent,
    SubFormComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormioModule,
    FormioGrid,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    TableModule,
    ButtonModule,
    // MeuComponentModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'forms',
        loadChildren: () => import('./forms/forms.module').then(m => m.FormsModule)
      },
      {
        path: 'manager',
        component: FormListComponent
      },
      {
        path: 'subForm',
        component: SubFormComponent
      }
    ], {useHash: true})
  ],
  providers: [
    PrismService,
    FormioAuthService,
    FormioResources,
    {provide: FormioAppConfig, useValue: AppConfig},
    {provide: FormioAuthConfig, useValue: {
      login: {
        form: 'user/login'
      },
      register: {
        form: 'user/register'
      }
    }}
  ],
  bootstrap: [AppComponent],
})
export class AppModule { 
  constructor(injector: Injector) {
    registerMeuComponente(injector);
  }
}
