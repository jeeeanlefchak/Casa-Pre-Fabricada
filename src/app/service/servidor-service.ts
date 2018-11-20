import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AbstractService } from './abstract-service';
import { Slide } from '../models/slide';

@Injectable()
export class ServidorService extends AbstractService<Slide> {

    constructor(router: Router, http: Http) {
        super(router, http);

    }

    public getWebService(): string {
        return 'servidor';
    }

    public verificaConexao() {
        return this.http.get(this.urlWebBase + '/conexao').map(res => {
            return res.json();
        })
    }

}
