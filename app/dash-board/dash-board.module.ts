import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashBoardPageRoutingModule } from './dash-board-routing.module';

import { DashBoardPage } from './dash-board.page';
import { ReactiveFormsModule}from '@angular/forms'
import { GetInfoService } from '../shared/get-info.service';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashBoardPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  declarations: [DashBoardPage]
})
export class DashBoardPageModule {}
