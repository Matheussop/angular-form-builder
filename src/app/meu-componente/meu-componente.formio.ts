import { MeuComponenteComponent } from './meu-componente.component';
import { Injector } from '@angular/core';
import {
  Components,
  registerCustomFormioComponent,
} from 'projects/angular-formio/src';
import { FormioCustomComponentInfo } from './../../../projects/angular-formio/src/elements.common';
const COMPONENT_OPTIONS: FormioCustomComponentInfo = {
  type: 'meuComponente', // custom type. Formio will identify the field with this type.
  selector: 'meu-componente', // custom selector. Angular Elements will create a custom html tag with this selector
  title: 'Meu Componente', // Title of the component
  group: 'basic', // Build Group
  icon: 'fa fa-star', // Icon
  //  template: 'input', // Optional: define a template for the element. Default: input
  //  changeEvent: 'valueChange', // Optional: define the changeEvent when the formio updates the value in the state. Default: 'valueChange',
  //  editForm: Components.components.textfield.editForm, // Optional: define the editForm of the field. Default: the editForm of a textfield
  //editForm: Components.components.datagrid.editForm, // Optional: define the editForm of the field. Default: the editForm of a textfield
  editForm: minimalEditForm, // Optional: define the editForm of the field. Default: the editForm of a textfield
  //  documentation: '', // Optional: define the documentation of the field
  //  weight: 0, // Optional: define the weight in the builder group
  //  schema: {}, // Optional: define extra default schema for the field
  //  extraValidators: [], // Optional: define extra validators  for the field
  //  emptyValue: null, // Optional: the emptyValue of the field
  // fieldOptions: ['values', 'Label'], // Optional: explicit field options to get as `Input` from the schema (may edited by the editForm)
};

export function registerMeuComponente(injector: Injector) {
  registerCustomFormioComponent(
    COMPONENT_OPTIONS,
    MeuComponenteComponent,
    injector
  );
}

export function minimalEditForm() {
  return {
    components: [
      {
        type: 'textfield',
        label: 'PlaceHolder',
        key: 'placeholder',
        tooltip: 'Texto que sera mostrado no placeholder.',
        placeholder: 'Texto',
        weight: 410,
        input: true,
      },
      {
        type: 'checkbox',
        label: 'Disable Adding / Removing Rows',
        key: 'disableAddingRemovingRows',
        tooltip: 'Check if you want to hide Add Another button and Remove Row button',
        weight: 405,
        input: true,
        clearOnHide: false,
        customConditional(context) {
          return !context.data.enableRowGroups;
        },
        calculateValue(context) {
          return context.data.enableRowGroups ? true : context.data.disableAddingRemovingRows;
        },
      },
      {
        weight: 406,
        type: 'textarea',
        input: true,
        key: 'conditionalAddButton',
        label: 'Conditional Add Button',
        placeholder: 'show = ...',
        tooltip: 'Specify condition when Add Button should be displayed.',
        editor: 'ace',
        as: 'javascript',
        wysiwyg: {
          minLines: 3,
        },
      },
      {
        type: 'checkbox',
        label: 'Allow Reorder',
        key: 'reorder',
        weight: 407,
        input: true,
      },
      {
        type: 'textfield',
        label: 'Add Another Text',
        key: 'addAnother',
        tooltip: 'Set the text of the Add Another button.',
        placeholder: 'Add Another',
        weight: 410,
        input: true,
        customConditional(context) {
          return !context.data.disableAddingRemovingRows;
        }
      },
      {
        type: 'select',
        label: 'Add Another Position',
        key: 'addAnotherPosition',
        dataSrc: 'values',
        tooltip: 'Position for Add Another button with respect to Data Grid Array.',
        defaultValue: 'bottom',
        input: true,
        data: {
          values: [
            { label: 'Top', value: 'top' },
            { label: 'Bottom', value: 'bottom' },
            { label: 'Both', value: 'both' }
          ]
        },
        weight: 411,
        customConditional(context) {
          return !context.data.disableAddingRemovingRows;
        }
      },
      {
        type: 'checkbox',
        label: 'Equal column width',
        key: 'layoutFixed',
        weight: 430,
        input: true,
      },
      {
        key: 'enableRowGroups',
        type: 'checkbox',
        label: 'Enable Row Groups',
        weight: 440,
        input: true
      },
      {
        label: 'Groups',
        disableAddingRemovingRows: false,
        defaultOpen: false,
        addAnother: '',
        addAnotherPosition: 'bottom',
        mask: false,
        tableView: true,
        alwaysEnabled: false,
        type: 'datagrid',
        input: true,
        key: 'rowGroups',
        reorder: true,
        components: [
          {
            label: 'Label',
            allowMultipleMasks: false,
            showWordCount: false,
            showCharCount: false,
            tableView: true,
            alwaysEnabled: false,
            type: 'textfield',
            input: true,
            key: 'label',
            widget: {
              type: ''
            },
            row: '0-0'
          },
          {
            label: 'Number of Rows',
            mask: false,
            tableView: true,
            alwaysEnabled: false,
            type: 'number',
            input: true,
            key: 'numberOfRows',
            row: '0-1'
          }
        ],
        weight: 441,
        conditional: { json: { var: 'data.enableRowGroups' } }
      },
      {
        label: 'Hide Group on Header Click',
        type: 'checkbox',
        input: true,
        key: 'groupToggle',
        weight: 442,
        conditional: { json: { var: 'data.enableRowGroups' } }
      },
      {
        label: 'Initialize Empty',
        type: 'checkbox',
        input: true,
        key: 'initEmpty',
        tooltip: 'The DataGrid will have no visible rows when initialized.',
        weight: 450
      }
    ],
  };
}
