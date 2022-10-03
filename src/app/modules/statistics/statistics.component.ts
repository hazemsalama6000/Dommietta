import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BranchService } from 'src/app/core-module/LookupsServices/branch.service';
import { LookUpModel } from 'src/app/shared-module/models/lookup';
import { AuthService } from '../auth';
import { IUserData } from '../auth/models/IUserData.interface';
import { SignalrService } from './services/signalr.service';
import { StatisticService } from './services/statistic.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  dropdownBranch: LookUpModel[] = [];
  userData: IUserData;
  unsubscribe: Subscription[] = [];
  branchId:number;

  constructor(
    private auth: AuthService,
    private branchService: BranchService,
    private statisticService: StatisticService,
    private signalrService: SignalrService
  ) {
    let data = auth.userData.subscribe(res => {
      this.userData = res;
      this.branchId=res.branchId;
      statisticService.branchId.next(res.branchId);
      this.branchService.getLookupBranchData(this.userData.companyId).subscribe((data: LookUpModel[]) => this.dropdownBranch = data);
    });
    this.unsubscribe.push(data);
  }

  ngOnInit() {
    this.signalrService.startConnection();
  }

  onSelectBranch(item: LookUpModel) {
    if (item) {
      this.statisticService.branchId.next(item.Id);
    }
  }

}
