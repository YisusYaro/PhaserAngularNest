import { Injectable, EventEmitter } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class WebSocketService extends Socket {

  moventCallback: EventEmitter<any> = new EventEmitter();
  newCharacterCallback: EventEmitter<any> = new EventEmitter();
  currentCharectersCallback: EventEmitter<any> = new EventEmitter();

  static instance: WebSocketService;

  constructor() {
    super({
      url: `${environment.API_URL}`,
    });

    WebSocketService.instance = this;
    this.listenNewCharacters();
    this.listenMovents();
    this.listenCurrentCharacters();
  }

  createCharacter(character: string, id: string, room: string) {
    this.ioSocket.emit('create-character', { character, id, room });
  }

  listenNewCharacters() {
    this.ioSocket.on('create-character', (character: { character: string, id: number, room: string }) => this.newCharacterCallback.emit(character));
  }

  sendMovent(x: number, y: number, id: string, room: string) {
    this.ioSocket.emit('movent', { x, y, id, room });
  }

  listenMovents() {
    this.ioSocket.on('movent', (movent: { x: number, y: number, id: number, room: string }) => this.moventCallback.emit(movent));
  }

  getCurrentCharacters(room: string) {
    this.ioSocket.emit('get-current-characters', { room });
  }

  listenCurrentCharacters() {
    this.ioSocket.on('get-current-characters', (characters: { character: string, id: number, room: string }[]) => this.currentCharectersCallback.emit(characters));
  }





}
