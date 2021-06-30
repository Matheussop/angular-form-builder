import { MeuComponenteComponent } from './meu-componente.component';
import { Injector } from '@angular/core';
import {
  Components,
  registerCustomFormioComponent,
} from 'projects/angular-formio/src';
import { FormioCustomComponentInfo } from "../elements.common";
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
      },
      {
        type: 'datagrid',
        input: true,
        key: 'customOptions.array1',
        label: 'Campos da tabela',
        placeholder: 'Adicione aqui os campos da sua tabela',
        validate: {
          required: false,
        },
        weight: 10,
        reorder: true,
        defaultValue: [{ nome: '', key: '' }],
        components: [
          {
            label: 'Nome Campo',
            key: 'nome',
            input: true,
            type: 'textfield',
          },
          {
            label: 'Key',
            key: 'key',
            input: true,
            type: 'textfield',
            allowCalculateOverride: true,
            calculateValue: { _camelCase: [{ var: 'row.nome' }] },
          }
        ],
      },
      {
        label: 'Selecionar Linha',
        type: 'checkbox',
        input: true,
        key: 'customOptions.hasSelect',
        tooltip: 'Permite o cliente selecionar uma linha da tabela.',
        weight: 450
      },
      {
        label: 'Permitir ordenação por coluna',
        type: 'checkbox',
        input: true,
        key: 'customOptions.hasFilter',
        tooltip: 'Permite o cliente ordernar os dados da tabela por coluna.',
        weight: 450
      },
      {
        label: 'Permitir paginação na tabela',
        type: 'checkbox',
        input: true,
        key: 'customOptions.hasPagination',
        tooltip: 'Colocar paginação na tabela.',
        weight: 450
      },
      {
        type: 'select',
        input: true,
        weight: 0,
        tooltip: 'A fonte de onde sera retirado os dados. Valor, permite que você forneça seus próprios valores. JSON permite fornecer dados JSON brutos. URL permite que você forneça um URL para recuperar os dados JSON.',
        key: 'dataSrc',
        defaultValue: 'values',
        label: 'Data Source Type',
        dataSrc: 'values',
        data: {
          values: [
            { label: 'Valor', value: 'values' },
            { label: 'URL', value: 'url' },
            { label: 'Resource', value: 'resource' },
            { label: 'Custom', value: 'custom' },
            { label: 'Raw JSON', value: 'json' },
          ],
        },
      },
      {
        type: 'textarea',
        as: 'json',
        editor: 'ace',
        weight: 10,
        input: true,
        key: 'customOptions.json',
        label: 'Data Source Raw JSON',
        tooltip: 'A raw JSON array to use as a data source.',
        conditional: {
          json: { '===': [{ var: 'data.dataSrc' }, 'json'] },
        },
      },
      {
        type: 'textfield',
        input: true,
        key: 'customOptions.url',
        weight: 10,
        label: 'URL de dados',
        placeholder: 'URL de dados',
        tooltip: 'Um URL que retorna um array JSON para usar como fonte de dados.',
        conditional: {
          json: { '===': [{ var: 'data.dataSrc' }, 'url'] },
        },
      },
      {
        type: 'checkbox',
        input: true,
        label: 'Lazy Load Data',
        key: 'lazyLoad',
        tooltip: 'Quando definido, isso não disparará a solicitação para a URL até que esse controle esteja em foco. Isso pode melhorar o desempenho se você tiver muitos menus suspensos Selecionar em seu formulário, onde a API só será acionada quando o controle for ativado.',
        weight: 11,
        conditional: {
          json: {
            and: [
              {
                in: [
                  { var: 'data.dataSrc' },
                  [
                    'resource',
                    'url',
                  ],
                ],
              },
              {
                '!==': [
                  { var: 'data.widget' },
                  'html5'
                ]
              }
            ]
          },
        },
      },
      {
        type: 'datagrid',
        input: true,
        label: 'Request Headers',
        key: 'data.headers',
        tooltip: 'Set any headers that should be sent along with the request to the url. This is useful for authentication.',
        weight: 11,
        components: [
          {
            label: 'Key',
            key: 'key',
            input: true,
            type: 'textfield',
          },
          {
            label: 'Value',
            key: 'value',
            input: true,
            type: 'textfield',
          },
        ],
        conditional: {
          json: { '===': [{ var: 'data.dataSrc' }, 'url'] },
        },
      },
      {
        type: 'datagrid',
        input: true,
        label: 'Data Source Values',
        key: 'customOptions.values',
        tooltip: 'Values to use as the data source. Labels are shown in the select field. Values are the corresponding values saved with the submission.',
        weight: 10,
        reorder: true,
        defaultValue: [{ label: '', value: '' }],
        components: [
          {
            label: 'Label',
            key: 'label',
            input: true,
            type: 'textfield',
          },
          {
            label: 'Value',
            key: 'value',
            input: true,
            type: 'textfield',
            allowCalculateOverride: true,
            calculateValue: { _camelCase: [{ var: 'row.label' }] },
          },
        ],
        conditional: {
          json: { '===': [{ var: 'data.dataSrc' }, 'values'] },
        },
      },
      {
        type: 'select',
        input: true,
        dataSrc: 'url',
        data: {
          url: '/form?type=resource&limit=4294967295&select=_id,title',
        },
        authenticate: true,
        template: '<span>{{ item.title }}</span>',
        valueProperty: '_id',
        clearOnHide: false,
        label: 'Resource',
        key: 'data.resource',
        lazyLoad: false,
        weight: 10,
        tooltip: 'The resource to be used with this field.',
        conditional: {
          json: { '===': [{ var: 'data.dataSrc' }, 'resource'] },
        },
      },
      {
        type: 'textfield',
        input: true,
        label: 'Data Path',
        key: 'selectValues',
        weight: 12,
        description: 'The object path to the iterable items.',
        tooltip: 'The property within the source data, where iterable items reside. For example: results.items or results[0].items',
        conditional: {
          json: { '===': [{ var: 'data.dataSrc' }, 'url'] },
        },
      },
    ],
  };
}
