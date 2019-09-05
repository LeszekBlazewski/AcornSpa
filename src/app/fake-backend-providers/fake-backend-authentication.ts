import { Injectable } from '@angular/core';
import { FakeBackendProviderBase } from './fake-backend-provider-base';
import { User } from '../models/user';
import { HttpRequest, HttpHandler } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

const users: User[] = [{ id: 1, username: 'test', password: '123456', firstName: 'Test', lastName: 'User' }];

@Injectable()
export class FakeBackendAuthentication extends FakeBackendProviderBase {

    protected handleRoute(request: HttpRequest<any>, next: HttpHandler) {
        switch (true) {
            case request.url.endsWith(environment.authenticationUrl) && request.method === 'POST':
                return this.authenticate(request.body);
            case request.url.endsWith(environment.registrationUrl) && request.method === 'POST':
                return this.register(request.body);
            default:
                return next.handle(request);
        }
    }

    private authenticate(body) {
        const { username, password } = JSON.parse(body);
        const user = users.find(x => x.username === username && x.password === password);
        if (!user) return this.httpError('Username or password is incorrect');
        return this.httpOk({
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            token: 'fake-jwt-token'
        })
    }

    private register(body) {
        const user: User = JSON.parse(body);
        users.push(user);
        return this.httpOk();
    }

}