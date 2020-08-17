import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class GetInfoService {

  dbUrl = "http://localhost:5000/users/";
  private url = 'http://localhost:5000';
  oUSER: any;
  currentUserEmail: any;
  public socket;
  oChannel: any;

  constructor(private http: HttpClient) {
    this.socket = io(this.url);
  }


  //OBSERVABLES

  private clickuser = new Subject<any>()
  clickuser$ = this.clickuser.asObservable();

  callclickuser(user) {
    this.oUSER = user;
    this.currentUserEmail = user.email;
    this.clickuser.next(user);
    console.log(this.oUSER); 
  }

  private clickChannel = new Subject<any>()
  clickChannel$ = this.clickChannel.asObservable();

  callclickChannel(channel) {
    this.oChannel = channel;
    this.clickChannel.next(channel);

    // console.log(this.oChannel)
  }


  newMessages() {
    let observable = new Observable<{ user: String, message: String, time: String }>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
        // console.log(data);

      });
      return () => { this.socket.disconnect(); }
    });
    return observable;
  }

  newChannelMessages() {
    let observable = new Observable<{ user: String, message: String, time: String }>(observer => {
      this.socket.on('new_message', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });
    return observable;
  }
  onlineAllDetails() {
    let observable = new Observable<{ message: String }>(observer => {
      this.socket.on('usersOnline', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });
    return observable;
  }
  offlineDetails() {
    let observable = new Observable<{ message: String }>(observer => {
      this.socket.on('logOut', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });
    return observable;
  }
  typingDetails() {
    let observable = new Observable<{ message: String }>(observer => {
      this.socket.on('user_typing', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });
    return observable;
  }

  memberChanneltypingDetails() {
    let observable = new Observable<{ message: String }>(observer => {
      this.socket.on('channel_user_typing', (data) => {

        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });
    return observable;
  }
  ChannelCreatedDetails() {
    let observable = new Observable<{ message: String }>(observer => {
      this.socket.on('channel_created_done', (data) => {

        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });
    return observable;
  }
  sms()
  {
    let observable = new Observable<{ user: String, message: String, time: String }>(observer => {
      this.socket.on('sms', (data) => {
        observer.next(data);
        if(this.currentUserEmail==data.user){
          console.log(data);
        }
      });
      return () => { this.socket.disconnect(); }
    });
    return observable;
  }





  get(data) {
    return this.http.post('http://localhost:5000/users/login', data);
  }
  SignUp(user) {
    // console.log(user);
    return this.http.post(this.dbUrl, user);
  }
  getusers(): Observable<any> {
    return this.http.get(this.dbUrl);
  }
  getChannels() {
    return this.http.get(this.url + '/channels/');
  }
  getCurrentChannel() {
    return this.oChannel;
  }
  getLastSms(data) {
    // console.log(data);;
    return this.http.get(' http://localhost:5000/messages/last/' + data);
  }

  createChannels(channelName) {
    console.log(channelName);
    return this.http.post(this.url + '/channels', channelName);
  }
  insertUSerIntoChannels(data) {
    console.log(data);    
    return this.http.post('http://localhost:5000/channels/add', data);
  }
  removeUSerFromChannels(data)
  {
    // console.log(data);    
    return this.http.post('http://localhost:5000/channels/remove',data);
}

  //SOCKET
  joinRoom(data) {
    console.log(data);
    this.socket.emit('join', data);
  }

  sendMessage(data) {
    console.log(data);
    this.socket.emit('message', data);
  }
  sendChannelMessage(data) {
    // console.log(data);
    this.socket.emit('channel_message', data);
  }
  onlineDetails(data) {
    this.socket.emit('online', data);

  }
  userLogOut(data) {
    this.socket.emit('offline', data);
  }

  userTyping(data) {
    // console.log(data);    
    this.socket.emit("typing", data);
  }
  channelMemberTyping(data) {
    // console.log(data);
    this.socket.emit('member_typing', data);
  }
  refreshChannel(data){
    console.log("created channel");
    this.socket.emit('created_channel',data);
  }




  //MESSAGES
  getMessages(roomName) {
    return this.http.get(this.url + '/messages/' + roomName);
  }

  getChannelMessages(room) {
    return this.http.post('http://localhost:5000/channels/chat', room);
  }


  //LOGIN AUTH
  isLoggedIn()
  {
    return !!localStorage.getItem('name');
  }
}
