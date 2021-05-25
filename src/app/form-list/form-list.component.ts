import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormListService } from './form-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent implements OnInit {
  formList: Observable<any>;

  constructor(private router: Router,private listService: FormListService) { }

  ngOnInit(): void {
    this.formList = this.listService.getAll();
  }

  delete(key: string){
    this.listService.delete(key);
  }

  edit(form: any, key: any){
    localStorage.setItem("Form", JSON.stringify(form));
    this.router.navigate(['/forms/builder']);
  }

  view(form: any){
    localStorage.setItem("Form", JSON.stringify(form));
    this.router.navigate(['']);
  }

  newForm(){
    localStorage.clear();
    this.router.navigate(['/forms/builder']);
  }
}
