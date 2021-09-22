import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddManagerModel, AdminEditRoles } from '../../models';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/core/services';
import { TranslationService } from 'src/app/core/services/translationService';
import { Gender } from 'src/app/shared/models/gender.enum';
import { UsersService } from '../../services/users-service.service';

@Component({
  selector: 'vex-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  subscriptions: Subscription;
  addManagerFG: FormGroup;
  addRoleModelEdit: AdminEditRoles[] = [];
  addModel: AddManagerModel;
  roleListId: number[] = [];
  countryModel: any;
  gender = Gender;
  roles: any;

  constructor(private fromBuilder: FormBuilder
    , private router: Router
    , private userService: UsersService) {

  }

  /********** Initial ************/
  ngOnInit(): void {
    this.InitialFrom();
  }
  // From
  InitialFrom(): void {
    this.addManagerFG = this.fromBuilder.group({
      userName: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      family: ['', Validators.compose([Validators.required])],
      gender: ['', Validators.compose([Validators.required])],
      phoneNumber: ['', Validators.compose([Validators.required])],
      isActive: [false],
      isWriter: [false]
    })
  }

  get f() {
    return this.addManagerFG.controls
  }

  addRoleList(roleId: number): void {

    this.addManagerFG.patchValue({
      rolesId: this.roleListId
    });
  }

  /************** Submit ************** */
  onSubmit(): void {
    this.addModel = this.addManagerFG.value;
    this.addModel.gender = + Gender[this.f['gender'].value];
    this.subscriptions = this.userService.Create(this.addModel, '/admin/user/create').subscribe(data => {
      if (data.success) {
        this.router.navigate(['/users']);
      }
    });
  }
}
