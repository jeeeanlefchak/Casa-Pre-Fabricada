import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AbstractService } from './abstract-service';
import { Modelo } from '../models/modelo';

@Injectable()
export class ModeloService extends AbstractService<Modelo> {

    constructor(router: Router, http: Http) {
        super(router, http);

    }

    public getWebService(): string {
        return 'modelo';
    }

    public salvarLista(lista): Observable<Modelo> {
        return this.http.post(this.urlWebBase + '/salvarlista', lista).map(res => {
            return res.json();
        })
    }

    public buscarModelos(): Observable<Modelo[]>{
        return this.http.get(this.urlWebBase + '/buscarmodelos').map(res=>{
            return res.json();
        })
    }
}
