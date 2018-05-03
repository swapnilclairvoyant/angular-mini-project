import { Contacts } from './contacts';
import { ContactsService } from './contacts.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  providers: [ ContactsService ],
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  isOn: boolean;
  isOff: boolean;
  users: Contacts[];
  editUser: Contacts;
  constructor(private userService: ContactsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
   // this.getUsers();
    this.users = this.route.snapshot.data['message'].data;
  }
  getUsers(): void {
    this.userService.getUsers().subscribe(users => {
      console.log('User Array while get : ', users);
      this.users = users;
    });
  }

  add(id: number, firstName: string, lastName: string, phoneNo: number, city: string): void {
    this.editUser = undefined;
    firstName = firstName.trim();
    lastName = lastName.trim();
    phoneNo = phoneNo;
    city = city.trim();
    const newUser: Contacts = { firstName, lastName, phoneNo, city } as Contacts;
    console.log('User Array : ', this.users);
    this.userService.addUser(newUser).subscribe(user => this.users.push(user));
  }

  showHidden(user) {
    this.editUser = user;
  }

  undo(id: number): void {
    const index = this.users.findIndex(t => t.id === id);
    this.users.splice(index, 1);
  }

  delete(id: number): void {
    this.userService.deleteUser(id).subscribe( user => this.undo(id) );
    console.log('User Array : ', this.users);
    // this.undo(id);
  }

  update() {
    console.log('Edited User: ', this.editUser);
    if (this.editUser) {
      this.userService.updateUser(this.editUser)
        .subscribe(
          users => {
            console.log('Functional User: ', users);
            const ix = users ? this.users.findIndex(h => h.id === users.id) : -1;
            if (ix > -1) {
              console.log('Functional User1: ', users);
              this.users[ix] = users;
          }
        },
        err => {
          console.log(" ----->>> " + err);
        }
       );
      this.editUser = undefined;
    }
  }
}
