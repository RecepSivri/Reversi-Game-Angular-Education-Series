import { Component, Input, OnInit } from '@angular/core';
import { IScore } from '../models/game-table.model';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css']
})
export class ScoreBoardComponent implements OnInit {

  @Input() score: IScore = {X: 2, O: 2};
  constructor() { }

  ngOnInit(): void {
  }

}
