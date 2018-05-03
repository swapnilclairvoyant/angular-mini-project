import { ContactsComponent } from './contacts/contacts.component';
import { ContactsService } from './contacts/contacts.service';
import { ContactsResolver } from './contacts/contactsresolver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'contacts', component: ContactsComponent, resolve: {message: ContactsResolver} }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [ ContactsResolver,
               ContactsService ]
})
export class AppRoutingModule { }
