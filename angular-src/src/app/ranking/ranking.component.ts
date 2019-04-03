import { Component, OnInit } from '@angular/core';
import { ChalService } from '../services/chal.service';
import { FlawService } from '../services/flaw.service';
import { QuesService } from '../services/ques.service';
import { NotificationsService } from 'angular2-notifications/dist/';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  constructor(private chalService: ChalService,private flawService: FlawService,private queService: QuesService,
    private notificationsService: NotificationsService) { }

  chals: any;
  flaws: any;
  ques: any;
  ranking = {};
  chalScores = [];
  flawScores = [];
  queScores = [];
  team = JSON.parse(localStorage.getItem('user')).name;

  ngOnInit() {
    this.chalService.getAllChals().subscribe(
      data =>{
        this.chals = data.chals;
        for(let chal of this.chals){
          for(let user of chal.users){
            if(this.ranking.hasOwnProperty(user))
              this.ranking[user] = this.ranking[user]+chal.points;
            else
              this.ranking[user] = chal.points;
          }
        }
        for(let key in this.ranking){
          if(this.ranking.hasOwnProperty(key)){
            this.chalScores.push({'team': key, 'score': this.ranking[key]})
          }
        }
        this.chalScores.sort(function(a, b){
          return b.score - a.score;
        });
      },
      error => {
        this.notificationsService.error("Oops!!", JSON.parse(error._body).error, {timeOut: 5000, showProgressBar: true, pauseOnHover: true, clickToClose: true, animate: 'fromRight'});
      }
    );

    
    this.flawService.getRanklist().subscribe(
      data =>{
        this.flawScores = data.users;
      },
      error => {
        this.notificationsService.error("Oops!!", JSON.parse(error._body).error, {timeOut: 5000, showProgressBar: true, pauseOnHover: true, clickToClose: true, animate: 'fromRight'});
      }
    );

    
    this.queService.getAllQues().subscribe(
      data =>{
        this.ques = data.ques;
        for(let que of this.ques){
          for(let user of que.users){
            if(this.ranking.hasOwnProperty(user))
              this.ranking[user] = this.ranking[user]+que.points;
            else
              this.ranking[user] = que.points;
          }
        }
        for(let key in this.ranking){
          if(this.ranking.hasOwnProperty(key)){
            this.queScores.push({'team': key, 'score': this.ranking[key]})
          }
        }
        this.queScores.sort(function(a, b){
          return b.score - a.score;
        });
      },
      error => {
        this.notificationsService.error("Oops!!", JSON.parse(error._body).error, {timeOut: 5000, showProgressBar: true, pauseOnHover: true, clickToClose: true, animate: 'fromRight'});
      }
    );
  }

}
