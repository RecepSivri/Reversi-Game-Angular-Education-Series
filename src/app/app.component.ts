import {Component, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';
import { IScore } from './models/game-table.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {

  }

  gameScore!: IScore;
  playFlag = false;
  computerFlag = false;
  triggerCount = 0;
  showShadow = false;
  showInfo = false;
  playerStatus = '';
  @ViewChild('gameTable', {static: false}) gameTable!: ElementRef;
  @ViewChild('gameTableComponent', {static: false}) gameTableComponent!: any;
  setExceptionFlagPlayer = ($event: any) => {
    this.playFlag = $event;
  }

  setExceptionFlagComputer= ($event: any) => {
    this.computerFlag = $event;
  }

  setScoreBoard = ($event: IScore) => {
    this.gameScore = $event;
  }

  finishGamePlay = ($event: string) => {
    if(this.triggerCount === 0){
      switch($event){
        case 'win': this.playFinishAudio('win');
          this.playerStatus = 'You Win'
          this.showInfo = true;
          break;
        case 'lose': this.playFinishAudio('lose');
          this.playerStatus = 'You Lose'
          this.showInfo = true;
          break; 
        case 'draw': this.playFinishAudio('draw');
          this.playerStatus = 'Draw Game'
          this.showInfo = true;
          break;
      }
      this.renderDelayShadow();
    }
    ++this.triggerCount ;
   
  }

  playFinishAudio(sound: string){
    let audio = new Audio();
    audio.src = "../../assets/" +sound+".mp3";
    audio.load();
    audio.play();
  }

  delayShadow = () => {
    return new Promise((resolve) => setTimeout( () => {
      this.showShadow = !this.showShadow;
      resolve({});
    }, 500))
  }

  renderDelayShadow = async () => {
    for(let i = 0; i< 10; ++ i){
      await this.delayShadow();
    }
  }
  
  playAgain = () => {
    this.gameTableComponent.initializeTable();
    this.showInfo = false;
    this.triggerCount = 0;
  }

  getSliders() {
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.href = 'assets/Angular Crash Course session 1.pdf';
    link.download = 'Angular Crash Course session 1..pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

}
