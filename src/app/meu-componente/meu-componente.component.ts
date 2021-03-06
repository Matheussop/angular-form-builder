import {
  FormioCustomComponent,
  FormioEvent,
} from "./../../../projects/angular-formio/src/elements.common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TableModule } from "primeng/table";
import { Observable, iif } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { FormListService } from "../form-list/form-list.service";
import { Router } from "@angular/router";

const header = {
  array: [
    { nome: "Nome", key: "nome" },
    { nome: "Idade", key: "idade" },
    { nome: "Numero", key: "numero" },
    { nome: "Numero Processo", key: "numeroProcesso" },
    { nome: "Ata", key: "ata" },
  ],
};
// dados exemplos de entrada para a tabela
// [
//   { "nome": "teste", "idade": "teste", "numero": "teste", "CPF": "1", "numeroProcesso": "Numero Processo", "Ata": "Ata" },
//   { "nome": "teste2", "idade": "teste2", "numero": "teste2", "CPF": "2", "numeroProcesso": "Numero Processo", "Ata": "Ata"},
//   { "nome": "teste3", "idade": "teste5", "numero": "teste3", "CPF": "3", "numeroProcesso": "Numero Processo", "Ata": "Ata"},
//   { "nome": "teste4", "idade": "teste3", "numero": "teste4", "CPF": "4", "numeroProcesso": "Numero Processo", "Ata": "Ata"},
//   { "nome": "teste5", "idade": "teste4", "numero": "teste5", "CPF": "5", "numeroProcesso": "Numero Processo", "Ata": "Ata"},
//   { "nome": "teste6", "idade": "teste6", "numero": "teste6", "CPF": "6", "numeroProcesso": "Numero Processo", "Ata": "Ata"}
// ];
interface Data {
  nome: string;
  key: string;
}
@Component({
  selector: "app-meu-componente",
  templateUrl: "./meu-componente.component.html",
  styleUrls: ["./meu-componente.component.scss"],
})
export class MeuComponenteComponent implements FormioCustomComponent<number> {
  title: string = "";
  campos: Data[] = [];
  headerText: string = "";
  dados: any[];

  @Input()
  hasPagination: boolean = false;
  @Input()
  hasFilter: boolean = false;
  @Input()
  hasSelect: boolean = false;
  @Input()
  hasButtonColumnDelete: boolean = false;
  @Input()
  hasButtonUnicDelete: boolean = false;
  @Input()
  disabled: boolean;

  selectionMode: string = "";
  data: any[] = [];
  linhaSelecionada: any;

  @Input()
  url: string = "";

  @Input()
  json: any;

  @Output()
  valueChange = new EventEmitter<number>();

  @Input() placeholder: string;
  @Input() reorder: boolean;

  @Input() array1: any;
  @Input() value: any;
  @Input() SubForm: any;
  
  textButtonEdit_new: string = 'Novo';
  forms: any = [];
  formList: Observable<any>;

  @Input()
  teste: any = 'asdasdasds'

  @Output()
  formioEvent = new EventEmitter<FormioEvent>();
  // https://github.com/formio/angular/pull/443
  emitirEvento() {
    // this.formioEvent.emit({
    //   eventName: 'customEvent',
    //   data: { teste: 'teste' },
    // });
  }
  // formList: Observable<any>;
  private heroesUrl = "http://localhost:5000/api/Noticia/Tabela"; // URL to web api
  constructor(private http: HttpClient, private listService: FormListService, public router: Router,) {}

  ngOnInit() {
    this.campos = [];

    this.data = [];
    // this.formList = this.listService.getAll();
    // this.formList.subscribe((item) => {
    //   item.map((item2) => {
    //     this.forms.push({nome: item2.NomeFormulario, key: item2.key})
    //   })
    // })
  }

  extractData() {}

  ngOnChanges() {
    if (!this.dados && this.url) {
      var dados = localStorage.getItem("Dados");
      if (!dados) {
        this.getDados();
      } else {
        this.data = JSON.parse(dados);
      }
    }

    if (this.json) {
      this.json.map((item) => {
        if (this.campos[0]) {
          if (item[this.campos[0].key.toString()]) this.data = this.json;
        }
      });
    }


    if (this.hasSelect) {
      this.selectionMode = "single";
    }

    if (this.array1) this.campos = this.array1;
  }

  getTabela(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  getDados(): void {
    this.getTabela().subscribe((resp) => {
      console.log(resp);
      this.data = resp; 
      localStorage.setItem("Dados", JSON.stringify(resp));
    });
  }

  filter(data: any) {
    return this.hasFilter ? data : "";
  }

  printLinha(){
    console.log(this.linhaSelecionada);
  }

  apagarLinha(line?){
    if(!line)
    line = this.linhaSelecionada;

    this.data = this.data.filter((item) => item.id != line.id)
    //chamar metodo de service para deletar a linha.
  }

  mudarLinha(){
    if(this.linhaSelecionada == undefined){
      this.textButtonEdit_new = 'Novo' 
    }
    if(this.linhaSelecionada != undefined){
      this.textButtonEdit_new = 'Editar'
      if(this.hasButtonUnicDelete)
      document.getElementById("btnNew_Edit").classList.add("p-button-secondary");
    }
  }

  editarLinha(line?){
    if(!line)
      line = this.linhaSelecionada;
    
    this.formList = this.listService.getAll();
    this.formList.subscribe((item) => {
      item.map((item2) => {
        if(item2.NomeFormulario === this.SubForm){
          localStorage.setItem("SubForm", JSON.stringify(item2))
          if(line)
            localStorage.setItem("SubFormResp", JSON.stringify(line))
        
          localStorage.setItem("SubForm", JSON.stringify(item2))
          this.router.navigate(['subForm']);
        }
        // this.forms.push({nome: item2.NomeFormulario, key: item2.key})
      })
      
    })
  }
}
