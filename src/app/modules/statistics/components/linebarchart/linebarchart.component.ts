import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { BranchService } from 'src/app/core-module/LookupsServices/branch.service';
import { AuthService } from 'src/app/modules/auth';
import { IUserData } from 'src/app/modules/auth/models/IUserData.interface';
import { LookUpModel } from 'src/app/shared-module/models/lookup';
import { SignalrService } from '../../services/signalr.service';
import { StatisticService } from '../../services/statistic.service';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { FormControl } from '@angular/forms';
import { IStatisticBlills } from '../../models/IStatisticBlills.interface';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-linebarchart',
  templateUrl: './linebarchart.component.html',
  styleUrls: ['./linebarchart.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class LinebarchartComponent implements OnInit {
  dropdownEmployee: LookUpModel[] = [];
  dropdownBranch: LookUpModel[] = [];
  userData: IUserData;
  unsubscribe: Subscription[] = [];
  searchModel: ISearModel = { IssueDate: '', Branch_Id: null, Collector_Id: null };
  public chart: any;

  constructor(
    private statisticService: StatisticService,
    private signalr: SignalrService,
    private datePipe: DatePipe

  ) {
    Chart.register(...registerables);

    let branchData = statisticService.branchId.subscribe(res => {
      this.searchModel.IssueDate = '';
      this.searchModel.Collector_Id = null;
      this.searchModel.Branch_Id = res;
      this.fillDropdown();
      this.getData();
      this.date.setValue('');

    });
    this.unsubscribe.push(branchData);
  }

  ngOnInit(): void {
    this.createChart();
    this.getData();

    this.signalr.startConnection();
    this.signalr.actionListener('LoadBills', (data) => this.getData());
  }

  createChart() {

    this.chart = new Chart("linebarChart", {
      type: 'bar', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: [],
        datasets: [
          {
            label: "اجمالى التحصيلات",
            data: ['460', '999', '795', '658', '785', '359', '632', '800'],
            borderColor: 'blue',
            backgroundColor: 'blue',
            order: 1
          },
          {
            label: "اجمالى الفواتير",
            data: ['500', '1000', '900', '700', '850', '550', '700', '900'],
            borderColor: 'limegreen',
            backgroundColor: 'limegreen',
            type: 'line',
            order: 0
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          y: {
            stacked: true
          }
        }
      }
    });
  }

  getData() {
    this.statisticService.getDataForLineBar(this.searchModel).subscribe((res: IStatisticBlills[]) => {
      this.chart.data.labels = [];
      this.chart.data.datasets[0].data = []
      this.chart.data.datasets[1].data = []

      res.map((x) => {
        this.chart.data.datasets[0].data.push(x.collectionAmount);
        this.chart.data.datasets[1].data.push(x.sumBillAmount);
        this.chart.data.labels.push(this.searchModel.IssueDate || this.searchModel.IssueDate != '' ? x.collectorName : x.isu_IsDate);
      });
      this.chart.update();
    });
  }

  fillDropdown() {
    this.statisticService.getUserEmployee(this.searchModel.Branch_Id ?? 0).subscribe(res => this.dropdownEmployee = res)
  }

  // onSelectBranch(item: LookUpModel) {
  //   if (item) {
  //     this.searchModel.IssueDate = '';
  //     this.searchModel.Collector_Id = null;
  //     this.searchModel.Branch_Id = item.Id;
  //     this.getData();
  //     this.date.setValue('');
  //   }
  // }

  onSelectEmployee(item: LookUpModel) {
    if (item) {
      this.searchModel.IssueDate = '';
      this.searchModel.Collector_Id = item.Id;
      this.getData();
      this.date.setValue('');
    }
  }


  date = new FormControl(['']);

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    this.date.setValue(moment());

    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();

    this.searchModel.Collector_Id = null;
    this.searchModel.IssueDate = this.datePipe.transform(new Date(this.date.value._d ?? ''), 'yyyyMM') as string;
    this.getData();
  }

}

export interface ISearModel {
  IssueDate?: string | null,
  Branch_Id?: number | null,
  Collector_Id?: number | null,
}


