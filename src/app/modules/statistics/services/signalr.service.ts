import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  token: string;
  private hubConnection: signalR.HubConnection;
  options: signalR.IHttpConnectionOptions = {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets,
    accessTokenFactory: () => "Bearer " + localStorage.getItem('token')
  };


  constructor() {
  // this.startConnection();    
  }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${localStorage.getItem('companyLink')}/OperationsHub`, this.options).build();

    this.hubConnection.start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public actionListener = (methodName: string, callback: (data: string) => void) => {
    this.hubConnection.on(methodName, (data) => callback(data));
  }

  public invokeActionListener = (methodName: string, data: any) => {
    this.hubConnection.invoke(methodName, data).catch(err => console.error(`Error when Invoke ${methodName} Action \n Error : ${err}`));
  }

}
