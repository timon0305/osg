import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';

import { ContactsComponent } from './components/main.component';
import { FriendListComponent } from './components/friend-list/friend-list.component';

@NgModule({
  declarations: [
    ContactsComponent,
    FriendListComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule
  ],
  providers: [],
})
export class ContactsModule { }
