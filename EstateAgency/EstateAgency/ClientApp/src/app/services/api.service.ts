import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private url: string;

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.url = baseUrl;
    }

    getAdvertisementList() {
        return this.http.get<IAdvertisement[]>(this.url + "api/advertisement/Latest/10");
    }

    getAdvertisement(id) {
        return this.http.get<IAdvertisement>(this.url + "api/advertisement/" + id);
    }
}
