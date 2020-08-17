import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChannelInfoPageRoutingModule } from './channel-info-routing.module';

import { ChannelInfoPage } from './channel-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChannelInfoPageRoutingModule
  ],
  declarations: []
})
export class ChannelInfoPageModule {}
