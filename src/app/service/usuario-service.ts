import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AbstractService } from './abstract-service';
import { Usuario } from '../models/usuario';

@Injectable()
export class UsuarioService extends AbstractService<Usuario> {

    constructor(router: Router, http: Http) {
        super(router, http);

    }

    public getWebService(): string {
        return 'usuario';
    }

    public saveUser(user): Observable<Usuario> {
        return this.http.post(this.urlWebBase + '/saveUser', user).map(res => {
            return res.json();
        })
    }

    public getUser(user): Observable<Usuario>{
      // pra enviar do tipo get é pela url e
        return this.http.post(this.urlWebBase + '/getUser', user).map(res=>{
            return res.json();
        })
    }
}
