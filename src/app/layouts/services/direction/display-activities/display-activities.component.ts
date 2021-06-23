import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Activite } from 'src/app/shared/model/Activite';
import { DirectionService } from 'src/app/shared/services/direction.service';

@Component({
  selector: 'app-display-activities',
  templateUrl: './display-activities.component.html',
  styleUrls: ['./display-activities.component.css']
})
export class DisplayActivitiesComponent implements OnInit {

  @Input() direction;

  searchTerm: string;
  page = 1;
  pageActivite = 1;
  pageSize = 6;
  directionsSize: number;

  closeResult = '';
  public directions: any[];
  public directionsList: any[];
  directionObject: any;
 
  public displayActivityForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
  });
  public  directionActivity:Activite[];
  directionActivities: Observable<DisplayActivitiesComponent[]>;
  toastr: any;
  p: number=1;
  id:number;

  constructor(private directionService: DirectionService, private modalService: NgbModal,private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
   console.log(this.direction.nomDirection)
    this.directionService.getActivitiesByDirection(this.direction.nomDirection)
       .subscribe(data => {
         console.log(data)
        this.directionActivities = data;
       }, error => console.log(error));
   
  }


  
}
