import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BaseService {

    private readonly BASE_URL = 'http://localhost:4201/api/';

    constructor(private http: HttpClient) { }

    // TODO check security wholes (is this necessary)
    private config = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }

    get(relativeUrl: string): Observable<any> {
        const url = this.BASE_URL + relativeUrl;
        return this.http.get(url);
    }

    post(relativeUrl: string, object: any): Observable<any> {
        const url = this.BASE_URL + relativeUrl;
        return this.http.post(url, JSON.stringify(object), this.config);
    }

    put(relativeUrl: string, object: any): Observable<any> {
        const url = this.BASE_URL + relativeUrl;
        return this.http.put(url, JSON.stringify(object), this.config);
    }

    delete(relativeUrl: string): Observable<any> {
        const url = this.BASE_URL + relativeUrl;
        return this.http.delete(url, this.config);
    }
}
