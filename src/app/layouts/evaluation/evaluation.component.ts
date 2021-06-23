import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CampagneService } from 'src/app/shared/services/campagne.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {
  closeResult = '';

  public current = 1;
  public campagnes: any[] = [];

  public addForm: FormGroup = new FormGroup({
    nomCampagne: new FormControl('', Validators.required),
    dateCreation: new FormControl('', Validators.required),
    dateCloturer: new FormControl('', Validators.required),
  });

  constructor(private campagneService: CampagneService, public router: Router, private modalService: NgbModal) { }

  ngOnInit() {

    this.campagneService.getCampagneList().subscribe(
        data => {
          this.campagnes = data;
        },
        error => {
          console.log(error);
        }
      );
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
    this.campagneService.lancerCampagne(this.addForm.getRawValue()).subscribe(
      data => {
        // console.log(data);
        window.location.reload();
      }
    );
  }

}
