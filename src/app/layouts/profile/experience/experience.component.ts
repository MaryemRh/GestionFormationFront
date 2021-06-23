import { Experience } from './../../../shared/model/experience';
import { ExperienceService } from './../../../shared/services/experience.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from './../../../shared/authentication/token-storage.service';
import { UsersService } from './../../../shared/services/users.service';
import { User } from './../../../shared/model/User';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  edit: string = '';
  user: User = new User();
  userStorage: any = [];
  experiences: any = [];
  experience: Experience = new Experience();
  opened = false;

  constructor(
    private active: ActivatedRoute,
    private userService: UsersService,
    private experienceService: ExperienceService,
    private tokenStorage: TokenStorageService,
    private modalService: NgbModal,
    private tokenStorageService :TokenStorageService ,
    private usersService : UsersService
  ) {

  }

  async ngOnInit() {
    this.userStorage = await this.tokenStorage.getUser();
    this.active.params.subscribe((res: any) => {
      if (res.id === 'new') this.edit = res.id;
    })
    await this.getuserByUsername();
    // console.log(this.userStorage.id!=null);

    (this.userStorage.id!=null) ?     this.getAllExperiencesById():null
  }
  public getuserByUsername() {

    return this.userService.getuserByUsername(this.userStorage.username).subscribe(async (data) => {
      this.user = await data;
      // console.log(this.user);
      return this.user;
    });
  }
  onAddExperience() {
    //this.experience = {...this.experience, this.userStorage}
// console.log(this.userStorage.id);

   this.experience.userDTO = this.userStorage.id
    // console.log(this.experience);

    this.experienceService.createExperience(this.experience).subscribe(async (data) => {
      // console.log(this.userStorage);
      this.getAllExperiencesById() ;
      this.close();
      this.modalService.dismissAll();

      // console.log('ok');
    })
  }
  getAllExperiencesById() {
// console.log(this.userStorage);
this.experiences=[]
    this.experienceService.getAllExperiencesByUserId(this.userStorage.id).subscribe(async (data) => {
      this.experiences = data;
      // console.log(data);
    })
  }
  public close() {

    //console.log(Dialog result: ${status});
    this.opened = false;
  }
  openScrollableContent(longContent) {
    // this.collaborateurService.getallCollaborateurList().subscribe(data => {
    //   this.collaborateurs = data;
    //  // this.gridData = data;
    //   console.log(data);
    // }, error => {
    // });
    this.getuserByUsername();
    // console.log(longContent)
    this.modalService.open(longContent, { size: "lg" });

  }
}
