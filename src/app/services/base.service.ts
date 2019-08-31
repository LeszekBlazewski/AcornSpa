import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class BaseService {

    private readonly BASE_URL = environment.baseApiUrl;

    constructor(private http: HttpClient) { }

    private config = {
        headers: {
            'Content-Type': 'application/json'
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
