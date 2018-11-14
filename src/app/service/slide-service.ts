import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AbstractService } from './abstract-service';
import { Slide } from '../models/slide';

@Injectable()
export class SlideService extends AbstractService<Slide> {

    constructor(router: Router, http: Http) {
        super(router, http);

    }

    public getWebService(): string {
        return 'slide';
    }

    // public salvarLista(lista): Observable<any> {
    //     return this.http.post(this.urlWebBase + '/salvarlista', lista).map(res => {
    //         return res.json();
    //     })
    // }
}
