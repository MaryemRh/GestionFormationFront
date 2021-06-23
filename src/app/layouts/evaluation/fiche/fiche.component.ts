import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntretienService } from 'src/app/shared/services/entretien.service';

@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.css']
})
export class FicheComponent implements OnInit {

  public entretien: any = {};

  constructor(private entretienService: EntretienService,
              private route: ActivatedRoute
              ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('idEntretien');
    this.entretienService.getEntretienInformations(id).subscribe( data => {
      this.entretien = data;
      console.log(this.entretien);
    });
  }

}
