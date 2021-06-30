import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormioComponent } from './components/formio/formio.component';
import { FormBuilderComponent } from './components/formbuilder/formbuilder.component';
import { FormioAlerts } from './components/alerts/formio.alerts';
import { ParseHtmlContentPipe } from './components/alerts/parse-html-content.pipe';
import { FormioAlertsComponent } from './components/alerts/formio.alerts.component';
import { FormioLoaderComponent } from './components/loader/formio.loader.component';
import { CustomTagsService } from './custom-component/custom-tags.service';
import { FormioBaseComponent } from './FormioBaseComponent';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    FormioComponent,
    FormioBaseComponent,
    FormBuilderComponent,
    FormioLoaderComponent,
    FormioAlertsComponent,
    ParseHtmlContentPipe,
    // MeuComponenteComponent
  ],
  imports: [
    CommonModule,
    // MeuComponentModule
  ],
  exports: [
    FormioComponent,
    FormBuilderComponent,
    FormioLoaderComponent,
    FormioAlertsComponent,
    // MeuComponenteComponent
  ],
  providers: [
    FormioAlerts,
    CustomTagsService
  ],
  entryComponents: [
    FormioComponent,
    FormBuilderComponent
  ]
})
export class FormioModule {
}
