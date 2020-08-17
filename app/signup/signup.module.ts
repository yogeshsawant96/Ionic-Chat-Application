import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';
import { ReactiveFormsModule}from '@angular/forms'
import { GetInfoService } from '../shared/get-info.service';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [SignupPage]
})
export class SignupPageModule {}
