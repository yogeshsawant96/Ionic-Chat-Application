import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FriendListPageRoutingModule } from './friend-list-routing.module';

import { FriendListPage } from './friend-list.page';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FriendListPageRoutingModule
  ],
  declarations: [FriendListPage]
})
export class FriendListPageModule {}
