import { Injectable } from '@angular/core';

import { User } from '../models/user';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {

    constructor(private baseService: BaseService) { }


    public register(user: User) {
        return this.baseService.post(environment.registrationUrl, user);
    }

    public delete(userToDeleteId: number) {
        this.baseService.delete(environment.usersUrl + userToDeleteId.toString());
    }
}