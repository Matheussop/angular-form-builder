import { Component, OnInit } from '@angular/core';
import { FormioAppConfig } from "@formio/angular";
import { PrismService } from "../Prism.service";
import { ViewService } from "../home/view.service";
import { Observable } from "rxjs";
import { Router } from '@angular/router';
interface IResp {
  data: [];
  version: string;
}
@Component({
  selector: 'app-sub-form',
  templateUrl: './sub-form.component.html',
  styleUrls: ['./sub-form.component.scss']
})
export class SubFormComponent implements OnInit {
  public form: any;
  public keyForm: string;
  public version: number;
  public submission: any;
  respostasListObservable: Observable<any>;
  respostasList: any[];
  respostaList: Observable<any>;
  params: any;
  options: any;
  constructor(
    public config: FormioAppConfig,
    public prism: PrismService,
    public viewService: ViewService,
    public router: Router,
  ) {
    (this.params = {}), (this.form = []);
    this.respostasList = [];
  }

  ngAfterViewInit() {
    this.prism.init();
  }

  ngOnInit() {

    var data: any;
    if(localStorage.getItem("SubFormResp")){
      var respForm = localStorage.getItem("SubFormResp")
      data = {
        data: JSON.parse(respForm)
      }
    }
    
    if (localStorage.getItem("SubForm")) {
    
      var t = localStorage.getItem("SubForm").valueOf();
      this.form = JSON.parse(t);
      this.keyForm = JSON.parse(t).key;
      this.version = JSON.parse(t).version;
     
      this.submission = data;
    }
  }

  onSubmit(event) {
    const _ = require("lodash"); 
    var t = localStorage.getItem("Dados").valueOf();
    var newDados = JSON.parse(t);

    if(!event.data.id){
      event.data.id = newDados.length + 1;
      newDados.push(_.omit(event.data,'submit'))

    }else{
      newDados = newDados.map((item) => {
        if(event.data.id == item.id){
          return event.data;
        }else{
          return item
        }
      });
    }

    localStorage.setItem("Dados", JSON.stringify(newDados));
    localStorage.removeItem("SubForm")
    localStorage.removeItem("SubFormResp")
    this.router.navigate(['']);
    // lembra que essa forma de gerar id pode dar conflito na hora de deletar
  }

  voltarGrid(){
    localStorage.removeItem("SubForm")
    localStorage.removeItem("SubFormResp")
    this.router.navigate(['']);
  }
}