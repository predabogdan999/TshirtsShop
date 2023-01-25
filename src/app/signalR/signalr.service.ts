import { ChatModel } from './ChatModel';
import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"



@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  public data: ChatModel[] = [];
  public hubConnection: signalR.HubConnection


  constructor() { }

  public startConnection = (url:string ) => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                                                          .withUrl(url,{
                                                            skipNegotiation: true,
                                                            transport: signalR.HttpTransportType.WebSockets
                                                          })
                                                          .build();
    this.hubConnection
                      .start()
                      .then(() => console.log('Connection started'))
                      .catch(err => console.log('Error while starting connection: ' + err))
  }
}
