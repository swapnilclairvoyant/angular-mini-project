import { ContactsService } from './contacts.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ContactsResolver implements Resolve<Observable<any>> {

  constructor( private contactService: ContactsService ) {}
  resolve() {
    return this.contactService.getUsers();
  }
}
