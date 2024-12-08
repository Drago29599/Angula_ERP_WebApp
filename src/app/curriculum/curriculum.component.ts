import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Observable, Subscription } from 'rxjs';
import { allCurriculum } from '../models/curriculum-model';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.css']
})
export class CurriculumComponent {

  
  ////subjects$?: Observable<curriculumSub[]>;  // Observable to hold the subjects
  //allCurriculums$?: Observable<allCurriculum[]>;
  //constructor(private adminService: AdminService) { }
  //ngOnInit(): void {
  //  this.allCurriculums$ = this.adminService.getAllCurriculums();
  //  console.log(this.allCurriculums$);
  //}

}
