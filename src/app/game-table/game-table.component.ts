import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.css']
})
export class GameTableComponent implements OnInit {

  table:String[][] = []
  constructor() {
    for(let i = 0; i < 8; ++i){
      this.table.push([])
      for(let j = 0; j < 8; ++j){
        if( (i === 3 && j===3) ||  (i === 4 && j===4) ){
          this.table[i].push('X');
        }else
        if( (i === 3 && j===4) ||  (i === 4 && j===3) ){
          this.table[i].push('O');
        }else
          this.table[i].push('');
      }
    }

    console.log(this.table);
  }

  getValue(){
    return false;
  }

  ngOnInit(): void {
  }

}
