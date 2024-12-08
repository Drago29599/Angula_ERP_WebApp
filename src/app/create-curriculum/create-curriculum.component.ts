import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurriculumReq, TaggedSub, curriculumSub } from '../models/curriculum-model';
import { AdminService } from '../services/admin.service';
import { Observable, Subscription } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-curriculum',
  templateUrl: './create-curriculum.component.html',
  styleUrls: ['./create-curriculum.component.css']
})
export class CreateCurriculumComponent implements OnInit, OnDestroy {
  curriculum: CurriculumReq = {
    curriculumName: '',
    branch:'',
    curriculumYearType: '',
    taggedSub: [],
    createdAdminId : ''
  };

  isLoading = false;
  subjectList: [] = []; // List to hold available subjects

  availableSubjects: curriculumSub[] = []; // List to be populated via the adminService
  // Static list of subjects for testing
  //availableSubjects: curriculumSub[] = [
  //  { SubId: '111111111111111111111111', Subject: 'Mathematics', Branch:'CS' },
  //  { SubId: '2', Subject: 'Science', Branch: 'CS' },
  //  { SubId: '3', Subject: 'History', Branch: 'CS' },
  //  { SubId: '4', Subject: 'Geography', Branch: 'CS' },
  //  { SubId: '5', Subject: 'Literature', Branch: 'CS' },
  //  { SubId: '6', Subject: 'Biology', Branch: 'CS' },
  //  { SubId: '7', Subject: 'Chemistry', Branch: 'CS' },
  //  { SubId: '8', Subject: 'Physics', Branch: 'CS' },
  //  { SubId: '9', Subject: 'English', Branch: 'CS' },
  //  { SubId: '10', Subject: 'Philosophy', Branch: 'CS' },
  //];

  //availableSubjects: curriculumSub[] = [
  //  { SubId: 'D7A62231-4A7C-4DCD-91AC-29E919AC60D4', Subject: 'Introduction to Programming', Branch: 'Computer Science' },
  //  { SubId: '066323E3-0ED1-420B-BF9E-653D84DB4654', Subject: 'Artificial Intelligence', Branch: 'Computer Science' },
  //  { SubId: '4BC6A3C0-DE7B-4D84-9205-6802BAFE64B8', Subject: 'Discrete Mathematics', Branch: 'Computer Science' },
  //  { SubId: '098AD6C2-92B8-4E67-95BB-80828FFD2D10', Subject: 'Data Structures', Branch: 'Computer Science' },
  //  { SubId: '843E4851-753F-4BC5-9386-B2E89733077B', Subject: 'Database Management Systems', Branch: 'Computer Science' },
  //  { SubId: '4AA9A49E-2430-4708-9F02-CCEDC5BD4625', Subject: 'Computer Organization', Branch: 'Computer Science' },
  //  { SubId: '8DE20EE6-E38A-4D8A-BE0A-D5F951DE596C', Subject: 'Web Development', Branch: 'Computer Science' },
  //  { SubId: '128B1F88-DA8F-4F91-BDD2-F0AAB427653B', Subject: 'Software Engineering', Branch: 'Computer Science' },
  //  { SubId: 'D5B8FE9A-70AF-46AC-86E1-F1164074EE62', Subject: 'Operating Systems', Branch: 'Computer Science' },
  //  { SubId: 'ABF3EC0C-1D8B-4EA0-B8C2-FFE35E62EFC5', Subject: 'Computer Networks', Branch: 'Computer Science' }
  //];

  private subjectsSubscription: Subscription | undefined;

  subjects$?: Observable<curriculumSub[]>;  // Observable to hold the subjects

  selectedSubject: curriculumSub | undefined;

  constructor(private adminService: AdminService, private toastr: ToastrService) { }

  ngOnInit(): void {
    // Call admin method to get all subjects list
    //this.getAllSubjects();
    this.subjects$ = this.adminService.getAllSubjects();
    this.subjects$.subscribe({
      next: (data) => {
        this.availableSubjects = [...data];
      },
      error: (err) => {
        console.error('Error occurred:', err); // Logs any error if it occurs
      }
    });

  }


  // Getter to filter the mandatory subjects
  get mandatorySubjects(): TaggedSub[] {
    return this.curriculum.taggedSub.filter(sub => sub.isMandatorySub === 1);
  }

  // Getter to filter the optional subjects
  get optionalSubjects(): TaggedSub[] {
    return this.curriculum.taggedSub.filter(sub => sub.isMandatorySub === 0);
  }

  // Getter to check if max mandatory subjects (5) have been selected
  get isMandatorySubjectLimitReached(): boolean {
    return this.mandatorySubjects.length === 5;
  }

  // Getter to check if max optional subjects (2) have been selected
  get isOptionalSubjectLimitReached(): boolean {
    return this.optionalSubjects.length === 1;
  }

  // Function to handle subject selection
  onSubjectSelected(event: MatAutocompleteSelectedEvent, isMandatory: boolean): void {
    const selectedSubject = event.option.value;
    const existingSubject = this.curriculum.taggedSub.find(sub => sub.taggedSubId === selectedSubject.subId);

    // Only add the subject if it isn't already added
    if (!existingSubject) {
      this.curriculum.taggedSub.push({
        taggedSubId: selectedSubject.subId,
        isMandatorySub: isMandatory ? 1 : 0,
        subject: selectedSubject.subject // Add the subject name to the model
      });
    }
  }

  // Function to remove a subject from the taggedSub list
  removeSubject(subjectId: string): void {
    const index = this.curriculum.taggedSub.findIndex(sub => sub.taggedSubId === subjectId);
    if (index !== -1) {
      this.curriculum.taggedSub.splice(index, 1);  // Remove from the taggedSub list
    }
  }

  // Function to handle form submission
  onSubmit(): void {
    // Initialize the createdAdminId based on the value from localStorage
    this.curriculum.createdAdminId = localStorage.getItem('userId') || '';
    console.log(this.curriculum);
    this.adminService.CreateCurriculum(this.curriculum).subscribe((response) => {
      if (response === "Success") {
        // Show success toast message
        this.toastr.success('Curriculum created successfully!', 'Success');

        // Reset the form after successful creation
        this.resetForm();
      } else {
        // Show error toast message
        this.toastr.error('Curriculum creation failed!', 'Error');
        this.resetForm();
      }
    })
  }

  // Function to reset the form fields
  resetForm(): void {
    this.curriculum = {
      curriculumName: '',
      branch: '',
      curriculumYearType: '',
      taggedSub: [],
      createdAdminId: ''
    };
  }

  ngOnDestroy(): void {
    if (this.subjectsSubscription) {
      this.subjectsSubscription.unsubscribe();
    }
  }
}
