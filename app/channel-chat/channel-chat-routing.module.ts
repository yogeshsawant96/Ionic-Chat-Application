import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChannelChatPage } from './channel-chat.page';

const routes: Routes = [
  {
    path: '',
    component: ChannelChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChannelChatPageRoutingModule {}
