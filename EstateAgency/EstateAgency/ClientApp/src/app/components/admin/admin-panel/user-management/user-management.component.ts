import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.less']
})
export class UserManagementComponent implements OnInit {
  userList: IUserManagement[];

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.api.getAplicationsUsers().subscribe(res => {
      this.userList = res;
    });
  }

  lockUser = (userId: string): void => {
    var data = {};
    data["id"] = userId;

    this.api.putLockUser(data).subscribe(res => {
      this.userList = res;
    })
  }

  unlockUser = (userId: string): void => {
    var data = {};
    data["id"] = userId;

    this.api.putUnlockUser(data).subscribe(res => {
      this.userList = res;
    })
  }
}
