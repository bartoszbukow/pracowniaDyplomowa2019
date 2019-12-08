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

    getUserEditData() {
        return this.http.get<IUser>(this.url + "api/user/UserEditData");
    }

    putUser(user) {
        return this.http.put<IAdvertisement>(this.url + "api/user/UserEdit", user);
    }

    putUserChangePassword(data) {
        return this.http.put(this.url + "api/user/UserChangePassword", data);
    }

    postMessage(data) {
        return this.http.post<IMessageCreate>(this.url + "api/message/MessageCreate", data);
    }

    getMyMessages() {
        return this.http.get<IMessageList>(this.url + "api/message/MyMessages");
    }

    getConversation(data) {
        return this.http.get<IMessagesInConversation>(this.url + "api/message/Conversation" + data);
    }

    getSearchedAdvertisements(data) {
        return this.http.get<IAdvertisement[]>(this.url + "api/advertisement/SerchAdvertisements/" + data);
    }

    getAplicationsUsers() {
        return this.http.get<IUserManagement[]>(this.url + "api/admin/AplicationUsers");
    }

    putLockUser(data) {
        return this.http.put<IUserManagement[]>(this.url + "api/admin/LockUser", data);
    }

    putUnlockUser(data) {
        return this.http.put<IUserManagement[]>(this.url + "api/admin/UnlockUser", data);
    }
}
