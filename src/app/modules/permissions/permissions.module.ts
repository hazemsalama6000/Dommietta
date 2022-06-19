import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionsRoutingModule } from './permissions-routing.module';
import { SharedModule } from 'src/app/shared-module/shared-module.module';
import { TranslationModule } from '../i18n';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OnlineUsersComponent } from './components/onlineUsers/onlineUsers.component';
import { SearchOnlineUsersComponent } from './components/onlineUsers/search-online-users/search-online-users.component';
import { OnlineUsersDatatableComponent } from './components/onlineUsers/online-users-datatable/online-users-datatable.component';
import { UserLocationComponent } from './components/onlineUsers/online-users-datatable/user-locations/user-location.component';


@NgModule({
  declarations: [
	OnlineUsersComponent,
	SearchOnlineUsersComponent,
	OnlineUsersDatatableComponent,
	UserLocationComponent
  ],
  imports: [
    CommonModule,
    PermissionsRoutingModule,
    TranslationModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
	SharedModule
	 ]
})
export class PermissionsModule { }
