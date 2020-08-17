import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./dash-board/dash-board.module').then( m => m.DashBoardPageModule) 
  // }
    
  {
    path: 'dash-board',
    loadChildren: () => import('./dash-board/dash-board.module').then( m => m.DashBoardPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'friend-list',
    loadChildren: () => import('./friend-list/friend-list.module').then( m => m.FriendListPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'chat-box/:room',
    loadChildren: () => import('./chat-box/chat-box.module').then( m => m.ChatBoxPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'channel-chat',
    loadChildren: () => import('./channel-chat/channel-chat.module').then( m => m.ChannelChatPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'create-channel',
    loadChildren: () => import('./create-channel/create-channel.module').then( m => m.CreateChannelPageModule)
  },
  {
    path: 'pop-over',
    loadChildren: () => import('./pop-over/pop-over.module').then( m => m.PopOverPageModule)
  },
  {
    path: 'channel-info',
    loadChildren: () => import('./channel-info/channel-info.module').then( m => m.ChannelInfoPageModule)
  },
  {
    path: '**',
    redirectTo:"dash-board",
    pathMatch:'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
