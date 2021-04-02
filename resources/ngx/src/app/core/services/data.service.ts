import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';

@Injectable()
export class MessageService {
    private subject = new Subject<any>();

    sendMessage(info: string, message: string) {
        this.subject.next({ text: message, info: info });
    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}