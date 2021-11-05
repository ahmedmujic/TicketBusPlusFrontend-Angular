import { environment } from './../../../environments/environment.prod';
import { UserRegister } from './../../auth/models/user-register.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { map ,  distinctUntilChanged } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {


    constructor(
    ) { }



}
