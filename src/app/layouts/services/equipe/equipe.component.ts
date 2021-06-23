import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EquipeService } from 'src/app/shared/services/equipe.service';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css']
})
export class EquipeComponent implements OnInit {

  searchTerm: string;
  page = 1;
  pageActivite = 1;
  pageSize = 6;
  equipesSize: number;
  equipeObject: any;

  closeResult = '';
  public equipes: any[];
  public equipesList: any[];

  constructor(private equipeService: EquipeService,private modalService: NgbModal) { }

  ngOnInit() {
    this.equipeService.getEquipesList().subscribe(data => {
      this.equipesSize = data.length;
      this.equipes = data;
      this.equipesList = this.equipes;
      console.log(this.equipesList)
    });

  }
  open(content,equipe) {
    this.equipeObject = equipe;

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
