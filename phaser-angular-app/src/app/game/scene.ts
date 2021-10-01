import Phaser from 'phaser';
import { GameObjects } from 'phaser';
import { WebSocketService } from '../services/web-socket.service';
import { Injectable } from '@angular/core';

@Injectable()

export class Scene extends Phaser.Scene {

  bg?: GameObjects.Image;
  myCharacter?: GameObjects.Image;
  myCursor?: Phaser.Types.Input.Keyboard.CursorKeys;
  myCombo?: Phaser.Input.Keyboard.KeyCombo;
  id: string | null;
  room = '1000';
  character: string | null;

  characters: Map<string, GameObjects.Image>;



  constructor() {
    super({ key: "Bootloader" });
    this.id = prompt("write your name <3");
    this.character = prompt("write your character <3");
    this.characters = new Map();
    WebSocketService.instance.createCharacter(this.character!, this.id!, this.room);
    WebSocketService.instance.currentCharectersCallback.subscribe((characters: { character: string, id: string, room: string }[]) => {
      this.manageNewCharacters(characters);
    });
    WebSocketService.instance.newCharacterCallback.subscribe((character: { character: string, id: string, room: string }) => this.manageNewCharacter(character));
    WebSocketService.instance.moventCallback.subscribe((movent: { x: number, y: number, id: string, room: string }) => this.manageMovent(movent));
  }

  ngOnInit(): void {
  }

  preload() {
    this.load.path = "../../assets/";
    this.load.image('bg', 'bg.png');
    this.load.image('demon', 'demon.png');
    this.load.image('knight', 'knight.png');
  }

  getDistance(x1: number, y1: number, x2: number, y2: number) {
    return Math.hypot(x2 - x1, y2 - y1);
  }

  listenCursor(character: any, characterCursor: any) {
    if (characterCursor.left.isDown) {
      character.x--;
      character.flipX = true;
      WebSocketService.instance.sendMovent(this.myCharacter!.x, this.myCharacter!.y, this.id!, this.room);
    }
    if (characterCursor.right.isDown) {
      character.x++;
      character.flipX = false;
      WebSocketService.instance.sendMovent(this.myCharacter!.x, this.myCharacter!.y, this.id!, this.room);
    }
    if (characterCursor.up.isDown) {
      character.y--;
      WebSocketService.instance.sendMovent(this.myCharacter!.x, this.myCharacter!.y, this.id!, this.room);
    }
    if (characterCursor.down.isDown) {
      character.y++;
      WebSocketService.instance.sendMovent(this.myCharacter!.x, this.myCharacter!.y, this.id!, this.room);
    }
  }

  setKeyboard() {
    const keyCodes = Phaser.Input.Keyboard.KeyCodes;

    this.myCursor = this.input.keyboard.createCursorKeys();

    this.myCombo = this.input.keyboard.createCombo(
      [keyCodes.B, keyCodes.N, keyCodes.M],
      { resetOnMatch: true }
    );

    this.input.keyboard.on('keycombomatch', (keyCombo: Phaser.Input.Keyboard.KeyCombo) => {

      //event for demonCombo
      if (this.arraysAreIdentical([keyCodes.B, keyCodes.N, keyCodes.M], keyCombo.keyCodes)) {
        this.setTintCharacter(this.myCharacter!);
      }

    });
  }

  async setTintCharacter(character: GameObjects.Image) {
    character.setTint(0xff0000);
    await this.sleep(200);
    character.setTint(0xffffff);
    await this.sleep(200);
    character.setTint(0xff0000);
    await this.sleep(100);
    character.setTint(0xffffff);
    await this.sleep(100);
    character.setTint(0xff0000);
    await this.sleep(50);
    character.setTint(0xffffff);
    await this.sleep(50);
    character.setTint(0xff0000);
    await this.sleep(10);
    character.setTint(0xffffff);
    await this.sleep(10);
    character.setTint(0xff0000);
    await this.sleep(10);
    character.setTint(0xffffff);
    await this.sleep(10);
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  arraysAreIdentical(arr1: number[], arr2: number[]) {
    if (arr1.length !== arr2.length) return false;
    for (var i = 0, len = arr1.length; i < len; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }

  create() {

    //keyboard
    this.setKeyboard();
    //bg

    this.bg = this.add.image(this.scale.width / 2, this.scale.height / 2, 'bg');
    //characters
    if (this.character! == 'demon') {
      this.myCharacter = this.add.image(100, 250, 'demon');
      this.myCharacter.scale = 2;
    }
    if (this.character! == 'knight') {
      this.myCharacter = this.add.image(200, 250, 'knight');
      this.myCharacter.scale = 2;
    }

    WebSocketService.instance.getCurrentCharacters(this.room);

  }

  update(time: number, delta: number) {
    this.listenCursor(this.myCharacter, this.myCursor);

  }

  manageMovent(movent: { x: number, y: number, id: string, room: string }) {
    this.characters.get(movent.id)!.x = movent.x;
    this.characters.get(movent.id)!.y = movent.y;
  }

  manageNewCharacter(character: { character: string, id: string, room: string }) {
    if (character.character == 'demon') {
      this.characters.set(character.id, this.add.image(100, 250, 'demon'));
      this.characters.get(character.id)!.scale = 2;
    }
    if (character.character == 'knight') {
      this.characters.set(character.id, this.add.image(100, 250, 'knight'));
      this.characters.get(character.id)!.scale = 2;
    }
  }

  manageNewCharacters(characters: { character: string, id: string, room: string }[]) {

    characters.forEach(character => {

      
      if(character.id != this.id) {
        console.log(character);
        this.manageNewCharacter(character);
      }


    });
  }

  setCharacter() {

  }

}