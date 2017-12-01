import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { TrainService } from '../train.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public isLoggedIn: boolean;
  public username: String;
  public trainName: String;
  public trainCap: number;
  public trainStatus: String;

  //fake data for testing

  constructor(public authService: AuthenticationService, public trainService: TrainService) {
    this.isLoggedIn = false;
    this.trainStatus = "Working";
   }

  ngOnInit(){

    //console.log(this.trainLists);
  }

  ngDoCheck() {
    try{
      if(this.authService.userList[0].valid) 
      {
        this.isLoggedIn = true;
        this.username = this.authService.userList[0].username;
      }
    }catch(e){};
  }

  trainClicked(train){
    console.log("Train clicked: "+train.trainName);
    this.trainName = train.trainName;
    this.trainCap = train.trainCap;

  }

}
