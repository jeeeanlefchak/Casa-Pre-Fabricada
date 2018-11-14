import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AbstractService } from './abstract-service';
import { Slide } from '../models/slide';
import { Observable } from 'rxjs';

@Injectable()
export class SlideService extends AbstractService<Slide> {

    constructor(router: Router, http: Http) {
        super(router, http);

    }

    public getWebService(): string {
        return 'slide';
    }

    public buscarSlides(): Observable<Slide[]> {
        return this.http.get(this.urlWebBase + '/buscarslides').map(res=>{
            return res.json();
        })
    }
}
