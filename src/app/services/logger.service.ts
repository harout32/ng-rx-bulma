import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class LoggerService {

    constructor() { }
    log(className: string, value: string) {
        console.log(`${new Date()} - ${className} ${value}`);
    }
}