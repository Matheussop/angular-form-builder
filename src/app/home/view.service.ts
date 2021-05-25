import {Injectable} from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class ViewService{
    constructor(private db: AngularFireDatabase){}

    insert(resposta: any){
        return this.db.list('respostaForm').push(resposta).then((result: any) => {return result.key})
    }

    get(key: string){
        this.db.object(`respostaForm/${key}`).remove();
    }

    getAll() {
        return this.db.list('respostaForm')
          .snapshotChanges()
          .pipe(
            map(changes => {
              return changes.map(c => ({ key: c.payload.key, ...(c.payload.val() as {}) }));
            })
          );
    }
}