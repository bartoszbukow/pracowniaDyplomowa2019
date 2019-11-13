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
        return this.http.get<IAdvertisement[]>(this.url + "api/advertisement/Latest/9");
    }

    getAdvertisementListOfUser() {
        return this.http.get<IAdvertisement[]>(this.url + "api/advertisement/MyAdvertisement");
    }

    getAdvertisement(id) {
        return this.http.get<IAdvertisement>(this.url + "api/advertisement/" + id);
    }

    putAdvertisement(advertisement, additionalData) {
        return this.http.put<IAdvertisement>(this.url + "api/advertisement/update", advertisement, additionalData);
    }

    postAdvertisement(advertisement, additionalData) {
        return this.http.post<IAdvertisement>(this.url + "api/advertisement/create", advertisement, additionalData);
    }

    deleteAdvertisement(data) {
        return this.http.delete(this.url + "api/advertisement/delete", data);
    }

    getUserId() {
        return this.http.get(this.url + "api/user/UserId");
    }
}
