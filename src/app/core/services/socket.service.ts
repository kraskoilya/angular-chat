import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import * as io from 'socket.io-client';
import { io, ManagerOptions, Socket, SocketOptions } from 'socket.io-client';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;
  socketOptions!: Partial<ManagerOptions & SocketOptions>;

  constructor(private auth: AuthService) {
    this.auth.isAuthorized$.subscribe((res) => {
      res ? this.connect() : this.disconnect();
    });
  }

  on(eventName: string): Observable<unknown> {
    return new Observable((observer) => {
      this.socket.on(eventName, (msg) => {
        observer.next(msg);
      });
    });
  }

  emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }

  private connect(): void {
    this.socketOptions = {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: this.auth.tokenWithType,
          },
        },
      },
    };
    this.socket = io('http://localhost:3000', this.socketOptions);
    this.socket.on('connect', () => {
      console.log('Socket connnected');
    });
  }

  private disconnect(): void {
    this.socket.disconnect();
    if (this.socket.disconnected) {
      console.log('Socket disconnected');
    }
  }
}
