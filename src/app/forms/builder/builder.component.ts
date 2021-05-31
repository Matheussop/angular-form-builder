import { FormioRefreshValue } from "@formio/angular";
import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  EventEmitter,
} from "@angular/core";
import { PrismService } from "../../Prism.service";
import { saveAs } from "file-saver";
import { BuilderService } from "./builder.service";
import { Observable } from "rxjs";

interface Iform{
  components: any[],
  key: any,
  NomeFormulario: string
}
const initialStateForm: Iform = {
  components: [],
  key: '',
  NomeFormulario: ''
}
@Component({
  selector: "app-builder",
  templateUrl: "./builder.component.html",
  styleUrls: ["./builder.component.scss"],
})
export class BuilderComponent implements AfterViewInit {
  @ViewChild("json", { static: true }) jsonElement?: ElementRef;
  @ViewChild("code", { static: true }) codeElement?: ElementRef;
  @ViewChild("FileSelectInputDialog") FileSelectInputDialog: ElementRef;
  public form: Object;
  public nomeform : string = ''; 
  key: string = '';
  version: number = 0;
  public keyObservable: Promise<any>;
  public generateForm: Object;
  public refreshForm: EventEmitter<FormioRefreshValue> = new EventEmitter();
  constructor(public prism: PrismService,private builderService: BuilderService) {
    this.form = { components: [] };
    this.generateForm = { components: []
    };
  }
  ngOnInit(){
    if (localStorage.getItem("Form")) {
      var newForm = localStorage.getItem("Form").valueOf();
      this.jsonElement.nativeElement.appendChild(
        document.createTextNode(JSON.stringify(JSON.parse(newForm).components, null, 4))
      );
      this.refreshForm.emit({
        property: "form",
        value: JSON.parse(newForm),
      });
      this.generateForm = JSON.parse(newForm).components;
      this.form = JSON.parse(newForm);
      this.key = JSON.parse(newForm).key;
      this.version = JSON.parse(newForm).version
      this.nomeform = JSON.parse(newForm).NomeFormulario.toString();
    }
  }
  ngAfterViewInit() {
    this.prism.init();
  }
  onChange(event) {
    this.jsonElement.nativeElement.innerHTML = "";
    this.jsonElement.nativeElement.appendChild(
      document.createTextNode(JSON.stringify(event.form.components  , null, 4))
    );
    this.refreshForm.emit({
      property: "form",
      value: event.form,
    });
    this.generateForm = event.form;
  }
  saveForm() {
    if(this.key){
      // var t = {"NomeFormulario": this.nomeform}
      this.generateForm.NomeFormulario = this.nomeform;
      this.generateForm.version = this.version + 1;
      var nameComponents = `${this.version}components`
      this.version++;
      var obj = {[nameComponents]:  this.form.components}
      const form = Object.assign({},obj,this.generateForm)
      this.builderService.update(form, this.key);
      localStorage.setItem('Form',JSON.stringify(form))
      this.form = this.generateForm
    }
    else{
      var t = {"NomeFormulario": this.nomeform, "version": 0}
      const form = Object.assign({},t,this.generateForm)
      this.keyObservable = this.builderService.insert(form)
      this.keyObservable.then(
        (value) => this.key = value
      )
      localStorage.setItem('Form',JSON.stringify(form))
      this.form = this.generateForm
    }
  }

  onKey(value: string) {
    this.nomeform = value ;
    console.log(this.nomeform)
  }
}
