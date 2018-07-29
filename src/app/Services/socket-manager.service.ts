import { Injectable } from '@angular/core';
import { AuthService } from 'angular2-social-login';
import { Socket } from 'socket.io';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

declare var io;

export enum EventName {
  boardUpdated = "boardUpdated"
}

@Injectable()
export class SocketManagerService {
  private socket: Socket;
  private boardUpdateSource = new BehaviorSubject<string>('');

  navItem$ = this.boardUpdateSource.asObservable();

  constructor(public socialLogin: AuthService) { 
    let isAuthenticated = (localStorage.getItem("isAuthenticated") == "true");

    if (isAuthenticated) {
      // login from local      
      this.socket = io(window.location.origin,{query:`loggeduser=${localStorage.getItem("uid")}`});      

      this.socket.on('needToUpdateBoard', (data) => this.eventRecieved('needToUpdateBoard', data));
    }
  }

  public Disconnect(): void {
    this.socket = this.socket.disconnect();
  }

  public emitEvent(eventName: EventName, body?: any) {
    this.socket.emit(eventName, body);
  }

  public eventRecieved(eventName: string, data) {
      this.boardUpdateSource.next(data);
      console.log(eventName + ' : ' + data);
  }
}
