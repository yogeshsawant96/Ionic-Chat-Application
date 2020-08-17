import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChannelInfoPage } from './channel-info.page';

const routes: Routes = [
  {
    path: '',
    component: ChannelInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChannelInfoPageRoutingModule {}
