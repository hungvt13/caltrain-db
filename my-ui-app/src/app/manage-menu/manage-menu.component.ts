import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import { TrainService } from '../train.service';
import { UserService } from '../user.service';
import { TravelsService } from '../travels.service';
import { TicketService } from '../ticket.service';
import { StationService } from '../station.service';
import { StartsAtService } from '../starts-at.service';
import { EndsAtService } from '../ends-at.service';
import { RouteService } from '../route.service';
import { PurchaseService } from '../purchase.service';
import { NextStationService } from '../next-station.service';
import { PrevStationService } from '../prev-station.service';





@Component({
  selector: 'app-manage-menu',
  templateUrl: './manage-menu.component.html',
  styleUrls: ['./manage-menu.component.css']
})
export class ManageMenuComponent implements OnInit {

  //selection
  public trainSelected: any;
  public userSelected: any;
  public stationSelected: any;
  public ticketSelected: any;
  public routeSelected: any;

  //form edit train setup
  public form: FormGroup;
  public editName;
  public editCap;
  public itemNo: number;
  public modalName: String;
  public modalBody: String;

  //form add train setup
  public form2: FormGroup;
  public trainName;
  public trainCap;
  public trainId;

  //form add route setup
  public form3: FormGroup;
  public id;
  public distance;
  public arrival;
  public dept;

  public isEdit;
  public isAdd;
  public addForm;
  public deleteCode;

  constructor(public fb: FormBuilder, 
                                      public trainService: TrainService, 
                                      public userService : UserService,
                                      public travelsService : TravelsService,
                                      public ticketService: TicketService,
                                      public stationService: StationService,
                                      public routeService: RouteService,
                                      public PurchaseService: PurchaseService,
                                      ) 
  {
    this.form = this.fb.group({
      editName: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      editCap: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
    });

    this.form2 = this.fb.group({
      trainName: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      trainCap: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      trainId: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
    });

    this.form3 = this.fb.group({
      id: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      distance: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      arrival: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      dept: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])]
    });

    this.itemNo = 2;
    this.isEdit = false;
    this.isAdd = false;
    this.deleteCode = 0;
   }

  ngOnInit() { 
  }

  public onClickedEdit(data: any, code: number){
    this.trainSelected = data;
    this.isEdit = true;
    this.isAdd = false;
    this.form.get("editName").setValue(data.trainName);
    this.form.get("editCap").setValue(data.trainCap);
    console.log(data);
  }

  public onClickedDel(data: any, code: number){

    this.deleteCode = code;

    switch(code){
      case 1:
      this.trainSelected = data;
      this.modalName = "Please confirm deleting";
      this.modalBody = "Are you sure to delete train: "+data.trainName+" ?";
      break;
      case 2:
      this.routeSelected = data;
      this.modalName = "Please confirm deleting";
      this.modalBody = "Are you sure to delete route: "+data.id+" ?";
      break;
    }

  }

  public confirmDelete(){
    switch(this.deleteCode){
      case 1: 
      this.trainService.deleteTrain(this.trainSelected);
      console.log("Deleted :"+ JSON.stringify(this.trainSelected));
      break;
      case 2:
      this.deleteCode = 2;
      this.routeService.deleteRoute(this.routeSelected);
      console.log("Deleted :"+ JSON.stringify(this.routeSelected));
    }
    this.modalName = "Deleting...";
    this.modalBody = "Success!!";
    setTimeout( location.reload(), 1000);
  }

  public onClickedItem(num: number){
    this.itemNo = num;
    this.isAdd = false;
    this.isEdit = false;
    this.trainSelected = null;
  }

  public onClickedAdd(num: number){
    this.isEdit = false;
    this.isAdd = true;
    this.addForm = num;
    console.log(this.addForm);
  }

  //submit for edit train
  public onSubmit(object: any){
    
    object['trainId'] = this.trainSelected['trainId'];
    object['trainName'] = object['editName'];
    object['trainCap'] = object['editCap'];
    console.log(object);
    this.trainService.editTrain(object);
    location.reload();

  }

  //submit for add train
  public onSubmit2(object: any){
    console.log(object);
    this.trainService.addTrain(object);
    location.reload();
  }

  //submit for add routes
  public onSubmit3(object: any){
    let temp: String = 'R-' + object.id;
    object['id'] = temp;
    console.log(object);
    this.routeService.addRoute(object);
    location.reload();
  }

  public splitTime(time: any){
    if(time.length == 3) return time.toString().replace(/\B(?=(\w{1})+(?!\d))/g, ":");
    return time.toString().replace(/\B(?=(\w{2})+(?!\d))/g, ":")
  }

}

class Train{
  trainName: string;
  trainCap: number;

  contructor(name: string,cap: number){
    this.trainName = name;
    this.trainCap = cap;
  }


}
