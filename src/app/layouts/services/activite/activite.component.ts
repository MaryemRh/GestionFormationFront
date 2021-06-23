import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Equipe } from 'src/app/shared/model/Equipe';
import { ActiviteService } from 'src/app/shared/services/activite.service';

@Component({
  selector: 'app-activite',
  templateUrl: './activite.component.html',
  styleUrls: ['./activite.component.css']
})
export class ActiviteComponent implements OnInit {

  searchTerm: string;
  page = 1;
  pageActivite = 1;
  pageSize = 6;
  activitesSize: number;
  currentRate = 8;


  closeResult = '';
  public activites: any[];
  public activitesList: any[];
  activiteObject: any;

  constructor(private activiteService: ActiviteService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.activiteService.getActiviteList().subscribe(data => {
      this.activitesSize = data.length;
      this.activites = data;
      this.activitesList = this.activites;
      console.log(this.activitesList)
    });
  }

  open(content, activite: any) {
    console.log(content)
    this.activiteObject = activite;
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
  openAct(content, activite){
    this.activiteObject = activite;
    console.log(this.activiteObject);
    console.log(content)
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log("heere")
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
}
