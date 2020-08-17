import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateChannelPageRoutingModule } from './create-channel-routing.module';

import { CreateChannelPage } from './create-channel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateChannelPageRoutingModule
  ],
  declarations: []
})
export class CreateChannelPageModule {}
