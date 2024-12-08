import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { allCurriculum } from '../models/curriculum-model';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-get-curriculum',
  templateUrl: './get-curriculum.component.html',
  styleUrls: ['./get-curriculum.component.css']
})
export class GetCurriculumComponent implements OnInit {

  //subjects$?: Observable<curriculumSub[]>;  // Observable to hold the subjects
  allCurriculums$?: Observable<allCurriculum[]>;
  constructor(private adminService: AdminService) { }
  ngOnInit(): void {
    this.allCurriculums$ = this.adminService.getAllCurriculums();
    console.log(this.allCurriculums$);
  }
}
