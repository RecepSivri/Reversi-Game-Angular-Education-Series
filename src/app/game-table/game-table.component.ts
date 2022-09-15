import { Component, DoCheck, EventEmitter, OnInit, Output } from '@angular/core';
import { IReversi, IScore } from '../models/game-table.model';
import { ComputerPlayService } from '../services/computer-play.service';
import { UserPlayService } from '../services/play-table.service';

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.css']
})
export class GameTableComponent implements OnInit, DoCheck {

  table:IReversi[][] = [];
  clickFlag: boolean = true;
  @Output() showTurnExceptionPlayer = new EventEmitter<boolean>();
  @Output() showTurnExceptionComputer = new EventEmitter<boolean>();
  @Output() returnScoreBoard = new EventEmitter<IScore>();
  @Output() finishGame = new EventEmitter<string>();

  constructor(private userPlayService: UserPlayService, private computerPlayServices: ComputerPlayService) {
    this.initializeTable();
  }

  initializeTable = () => {
    this.table = [];
    for(let i = 0; i < 8; ++i){
      this.table.push([])
      for(let j = 0; j < 8; ++j){
        if( (i === 3 && j===3) ||  (i === 4 && j===4) ){
          this.table[i].push({selected: false, value: 'X', maxMovement: 0});
        }else
        if( (i === 3 && j===4) ||  (i === 4 && j===3) ){
          this.table[i].push({selected: false, value: 'O', maxMovement: 0});
        }else
          this.table[i].push({selected: false, value: '', maxMovement: 0});
      }
    }
  }
  ngDoCheck(): void {
    this.returnScoreBoard.emit({X: this.countPiece('X'), O: this.countPiece('O')})
    if(this.checkFinish()){
        if(this.countPiece('X') > this.countPiece('O')){
          this.finishGame.emit('win')
        }else
        if(this.countPiece('X') < this.countPiece('O')){
          this.finishGame.emit('lose')
        }else
        if(this.countPiece('X') === this.countPiece('O')){
          this.finishGame.emit('draw')
        }
    }
  }

  getValue(){
    return false;
  }

  ngOnInit(): void {
  }  

  cellSelected = (row:number, column:number) => {
    if(this.computerPlayServices.returnMovementCountCell({Row:row, Column: column},this.table, 'X') > 0){
      if(this.table[row][column].value === ''){
        if(this.clickFlag){
          this.clickFlag = false;
          this.userPlayService.playGame({Row:row, Column: column},this.table,'X');   
          this.playComputerTurn();
      }
    }
  }
}

 playComputerTurn = async () => {
    let counter = 0;
    do{
      await this.delayPlayComputerGame();
      if(!this.checkFinish() && counter > 0){
        this.showTurnExceptionPlayer.emit(true);
        setTimeout( () => {
          this.showTurnExceptionPlayer.emit(false);
        },2000)
      }
      ++counter;
    }while(this.computerPlayServices.getTotalMovementAbility(this.table, 'X') === 0 && !this.checkFinish() )
}


delayPlayComputerGame = () => {
  return new Promise((resolve) => setTimeout( () => {
        this.clickFlag = true;
        if(this.computerPlayServices.getTotalMovementAbility(this.table, 'O') > 0 ){
          this.computerPlayServices.computerPlay(this.table);
        }else{
          if(!this.checkFinish()){
            this.showTurnExceptionComputer.emit(true);
          setTimeout( () => {
            this.showTurnExceptionComputer.emit(false);
          },2000)
          }
        }
        resolve({});
  }, 1000))
}

checkFinish(){
  if (this.returnIsDeadLock() ||  this.isFullTable()){
    return true;
  }else{
    return false;
  }
}

isFullTable = () => {
  if(this.countPiece('') === 64){
    return true;
  }else{
    return false;
  }
}

countPiece = (value: string) => {
  let counter = 0;
  for(let i = 0; i < 8; ++i){
    for(let j = 0; j < 8; ++j){
      if(this.table[i][j].value === value){
        ++counter;
      }
    }
  }
  return counter;
} 

returnIsDeadLock = () => {
  return this.computerPlayServices.getTotalMovementAbility(this.table, 'X') === 0
  && this.computerPlayServices.getTotalMovementAbility(this.table, 'O') === 0;
}

}
