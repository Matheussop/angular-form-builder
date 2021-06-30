
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TableModule } from "primeng/table";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { FormioCustomComponent, FormioEvent } from "../elements.common";

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

  @Output()
  formioEvent = new EventEmitter<FormioEvent>();
  // https://github.com/formio/angular/pull/443
  emitirEvento() {
    // this.formioEvent.emit({
    //   eventName: 'customEvent',
    //   data: { teste: 'teste' },
    // });
  }

  private heroesUrl = "http://localhost:5000/api/Noticia/Tabela"; // URL to web api
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.campos = [];

    this.data = [];
  }

  extractData() {}

  ngOnChanges() {

    if (!this.dados && this.url) {
      // var dados = localStorage.getItem("Dados");
      // if (!dados) {
        this.getDados();
      // } else {
      //   this.data = JSON.parse(dados);
      // }
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
}
