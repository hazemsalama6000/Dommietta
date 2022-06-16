import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionsRoutingModule } from './permissions-routing.module';
import { SharedModule } from 'src/app/shared-module/shared-module.module';
import { TranslationModule } from '../i18n';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OnlineUsersDataListComponent } from './components/onlineUsers/onlineUsers-dataList/onlineUsers-dataList.component';
import { OnlineUsersComponent } from './components/onlineUsers/onlineUsers.component';

@NgModule({
  declarations: [
	OnlineUsersDataListComponent,
	OnlineUsersComponent
  ],
  imports: [
    CommonModule,
    PermissionsRoutingModule,
    TranslationModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
	SharedModule,
  ]
})
export class PermissionsModule { }
