import { BuilderComponent } from './builder/builder.component';
export const FORMS: any = [
  {
    path: '',
    redirectTo: 'renderer',
    pathMatch: 'full'
  },
  {
    path: 'builder',
    title: 'Form Builder',
    component: BuilderComponent
  }
];
