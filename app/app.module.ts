import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule,FormsModule}from '@angular/forms';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { GetInfoService } from './shared/get-info.service';
import { CreateChannelPage} from './create-channel/create-channel.page';
import { CreateChannelPageModule} from './create-channel/create-channel.module';
import {PopOverPage} from './pop-over/pop-over.page'
import {ChannelInfoPage}from './channel-info/channel-info.page';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';





@NgModule({
  declarations: [AppComponent,CreateChannelPage,PopOverPage,ChannelInfoPage,CreateChannelPage],
  entryComponents: [PopOverPage,ChannelInfoPage,CreateChannelPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,ReactiveFormsModule,CreateChannelPageModule,
            HttpClientModule,FormsModule],
  providers: [
    GetInfoService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    LocalNotifications
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
