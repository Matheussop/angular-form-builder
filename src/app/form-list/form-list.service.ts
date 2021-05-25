import {Injectable} from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/database';
import {map} from 'rxjs/operators'
@Injectable({
    providedIn: 'root'
})
export class FormListService{
    constructor(private db: AngularFireDatabase){}

    getAll() {
        return this.db.list('form')
          .snapshotChanges()
          .pipe(
            map(changes => {
              return changes.map(c => ({ key: c.payload.key, ...(c.payload.val() as {}) }));
            })
          ); 
    }

    delete(key: string) {
        this.db.object(`form/${key}`).remove();
    }

    edit(form: any){
    }

}