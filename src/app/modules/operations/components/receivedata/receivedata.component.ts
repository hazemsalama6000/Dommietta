import { Component, OnInit } from '@angular/core';
import { HttpReponseModel } from 'src/app/core-module/models/ResponseHttp';
import { toasterService } from 'src/app/core-module/UIServices/toaster.service';
import { ReceivedataService } from '../../services/receivedata.service';

@Component({
  selector: 'app-receivedata',
  templateUrl: './receivedata.component.html',
  styleUrls: ['./receivedata.component.scss']
})
export class ReceivedataComponent implements OnInit {

  buttons = {
    btnBranch: false,
    btnBlock: true,
    btnCustomer: true,
    btnIssue: true,
    btnArea: true
  }

  constructor(
    private toaster: toasterService,
    private receiveData: ReceivedataService
  ) { }

  ngOnInit() { }

  getBranchData() {
    // this.receiveData.syncBranchData().subscribe(
    //   (data: HttpReponseModel) => {
    //     if (data.isSuccess) {
    //       this.toaster.openSuccessSnackBar(data.message);
    //     }
    //     else if (data.isExists)
    //       this.toaster.openWarningSnackBar(data.message);
    //   },
    //   (error: any) => {
    //     this.toaster.openWarningSnackBar(error.toString().replace("Error:", ""));
    //   }
    // )
    setTimeout(() => {
      this.buttons.btnArea = false
    }, 500);
  }

  getAreaData() {
    //  this.receiveData.syncAreaData().subscribe(
    //   (data: HttpReponseModel) => {
    //     if (data.isSuccess) {
    //       this.toaster.openSuccessSnackBar(data.message);
    //     }
    //     else if (data.isExists)
    //       this.toaster.openWarningSnackBar(data.message);
    //   },
    //   (error: any) => {
    //     this.toaster.openWarningSnackBar(error.toString().replace("Error:", ""));
    //   }
    // )
    setTimeout(() => {
      this.buttons.btnBlock = false
    }, 500);
  }

  getBlockData() {
    //  this.receiveData.syncBlockData().subscribe(
    //   (data: HttpReponseModel) => {
    //     if (data.isSuccess) {
    //       this.toaster.openSuccessSnackBar(data.message);
    //     }
    //     else if (data.isExists)
    //       this.toaster.openWarningSnackBar(data.message);
    //   },
    //   (error: any) => {
    //     this.toaster.openWarningSnackBar(error.toString().replace("Error:", ""));
    //   }
    // )
    setTimeout(() => {
      this.buttons.btnCustomer = false
      this.buttons.btnIssue = false
    }, 500);
  }

  getIssueData() {
    //  this.receiveData.syncIssueData().subscribe(
    //   (data: HttpReponseModel) => {
    //     if (data.isSuccess) {
    //       this.toaster.openSuccessSnackBar(data.message);
    //     }
    //     else if (data.isExists)
    //       this.toaster.openWarningSnackBar(data.message);
    //   },
    //   (error: any) => {
    //     this.toaster.openWarningSnackBar(error.toString().replace("Error:", ""));
    //   }
    // )
    setTimeout(() => {
    }, 500);
  }

  getCustomerData() {
    // this.receiveData.syncCustomerData().subscribe(
    //   (data: HttpReponseModel) => {
    //     if (data.isSuccess) {
    //       this.toaster.openSuccessSnackBar(data.message);
    //     }
    //     else if (data.isExists)
    //       this.toaster.openWarningSnackBar(data.message);
    //   },
    //   (error: any) => {
    //     this.toaster.openWarningSnackBar(error.toString().replace("Error:", ""));
    //   }
    // )
    setTimeout(() => {
    }, 500);
  }

}
