import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateChannelPage } from './create-channel.page';

const routes: Routes = [
  {
    path: '',
    component: CreateChannelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateChannelPageRoutingModule {}
