import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DirectionService } from 'src/app/shared/services/direction.service';

@Component({
  selector: 'app-direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.css']
})
export class DirectionComponent implements OnInit {

  searchTerm: string;
  page = 1;
  pageActivite = 1;
  pageSize = 6;
  directionsSize: number;

  closeResult = '';
  public directions: any[];
  public directionsList: any[];
  directionObject: any;

  public activities: any[];
  activitiesObject: any;

  constructor(private directionService: DirectionService, private modalService: NgbModal) { }

  ngOnInit() {
    this.directionService.getDirectionList().subscribe(data => {
      this.directionsSize = data.length;
      this.directions = data;
      console.log(this.directions)
      this.directionsList = this.directions;
    });
  }

  open(content, direction: any) {
    this.directionObject = direction;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  openAct(content, direction: any) {
    this.directionObject = direction;
    console.log(direction);
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    


  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
