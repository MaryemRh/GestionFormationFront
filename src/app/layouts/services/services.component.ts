import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActiviteService } from 'src/app/shared/services/activite.service';
import { DirectionService } from 'src/app/shared/services/direction.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  searchTerm: string;
  page = 1;
  pageActivite = 1;
  pageSize = 6;
  directionsSize: number;
  activitesSize: number;
  currentRate = 8;

  closeResult = '';
  public directions: any[];
  public directionsList: any[];
  public activites: any[];
  public activitesList: any[];

  public addDirectionForm: FormGroup = new FormGroup({
    nomDirection: new FormControl('', Validators.required),
  });

  constructor(private directionService: DirectionService,
              private activiteService: ActiviteService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.directionService.getDirectionList().subscribe(data => {
      this.directionsSize = data.length;
      this.directions = data;
      this.directionsList = this.directions;
    });
    this.activiteService.getActiviteList().subscribe(data => {
      this.activitesSize = data.length;
      this.activites = data;
      this.activitesList = this.activites;
    });
  }



  open(content) {
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

  public submit() {
   /* this.directionService.createDirection(this.addDirectionForm.getRawValue()).subscribe(
      data => {
        // console.log(data);
        window.location.reload();
      }
    );*/
  }

}
