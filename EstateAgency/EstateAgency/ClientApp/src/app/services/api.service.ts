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

    postRegisterUser(user) {
        return this.http.post<IUser>(this.url + "api/user", user);
    }

    postAuthFromServer(data) {
        return this.http.post<ITokenResponse>(this.url + "api/token/auth", data);
    }

    getAdvertisementList() {
        return this.http.get<IAdvertisement[]>(this.url + "api/advertisement/Latest/10");
    }

    getAdvertisement(id) {
        return this.http.get<IAdvertisement>(this.url + "api/advertisement/" + id);
    }

    postAdvertisement(advertisement) {
        return this.http.post<IAdvertisement>(this.url + "api/advertisement", advertisement);
    }

    putAdvertisement(advertisement) {
        return this.http.put<IAdvertisement>(this.url + "api/advertisement", advertisement);
    }

    deleteAdvertisement(id) {
      return this.http.delete<IAdvertisement>(this.url + "api/advertisement/" + id, id);
    }
}
