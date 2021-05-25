import {Injectable} from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/database';
@Injectable({
    providedIn: 'root'
})
export class BuilderService{
    constructor(private db: AngularFireDatabase){}

    insert(form: any){
        return this.db.list('form').push(form).then((result: any) => {return result.key})
    }

    update(form: any, key: string){
        this.db.list('form').update(key,form).catch((error: any) => {console.error(error)})
    }
}