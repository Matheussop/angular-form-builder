import { Component, AfterViewInit } from '@angular/core';
import { FormioAppConfig } from '@formio/angular';
import { PrismService } from '../Prism.service';
import { ViewService } from './view.service';
import { Observable } from 'rxjs';
// interface Iform{
//   components: any[],
//   key: any,
//   NomeFormulario: string
// }
// const initialStateForm: Iform = {
//   components: [],
//   key: '',
//   NomeFormulario: ''
// }
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  public form: Object;
  public keyForm: string;
  public version: number;
  public submission: Object;
  respostasListObservable: Observable<any>;
  respostasList: any[];
  respostaList: Observable<any>;

  constructor(
    public config: FormioAppConfig,
    public prism: PrismService,
    public viewService: ViewService,
  ) {
    this.form = [];
    this.respostasList = [];
  }

  ngAfterViewInit() {
    this.prism.init();
  }

  ngOnInit(){
    if(localStorage.getItem('Form')){
      var t = localStorage.getItem('Form').valueOf();
      this.form = JSON.parse(t);
      this.keyForm = this.form.key;
      this.version = this.form.version;
      this.respostasListObservable = this.viewService.getAll();
      this.respostasListObservable.subscribe((resp) => {
        resp.map(datas => {
          if(datas.KeyForm == this.keyForm){
          var t = {"data": datas.data, "version": datas.version}
          const valor = Object.assign({},t,event)
          this.respostasList.push(JSON.stringify(valor));
          }
        })
      })
    }

  }

  onSubmit(event){
    this.respostasList = [];
    localStorage.setItem('RespostasForm',JSON.stringify(event));
    var t = {"KeyForm": this.keyForm, "version": this.version}
    const resposta = Object.assign({},t,event)
    this.viewService.insert(resposta)
  }

  preecherRespostas(){
    // var respostas = localStorage.getItem('RespostasForm').valueOf();
    // this.submission = JSON.parse(respostas);
    this.respostaList = this.viewService.getAll();
    this.respostaList.subscribe(
      (value) => {
        value.forEach(resposta => {
        if(resposta.KeyForm == this.keyForm){
          this.submission = resposta;
        }
        })
      }
    )
    // this.respostaList.forEach(resposta => {
    //   if(resposta){
    //     console.log(resposta[0])
    //     console.log(this.keyForm)
    //     // this.submission = resposta;
    //   }
    // })
    // console.log(this.submission)
  }
}


