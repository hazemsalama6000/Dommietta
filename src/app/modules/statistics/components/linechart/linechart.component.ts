import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { toasterService } from 'src/app/core-module/UIServices/toaster.service';
import { AuthService } from 'src/app/modules/auth';
import { LookUpModel } from 'src/app/shared-module/models/lookup';
import { IStatisticEmployee } from '../../models/IStatisticEmployee.interface';
import { SignalrService } from '../../services/signalr.service';
import { StatisticService } from '../../services/statistic.service';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.scss']
})
export class LinechartComponent implements OnInit {
  public chart: any;
  dropdownEmployee: LookUpModel[] = [];
  searchModel: ISearModel = { EmployeeId: null };
  startDate: string;
  endDate: string;
  isMonthly: boolean = true;
  unsubscribe: Subscription[] = [];

  constructor(
    private statisticService: StatisticService,
    private signalr: SignalrService,
    private auth: AuthService,
    private datePipe: DatePipe,
    private toster: toasterService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    let branchData = this.statisticService.branchId.subscribe(res => {
      this.statisticService.getUserEmployee(res).subscribe(res => this.dropdownEmployee = res);
      let startdate = new Date();
      let enddate = new Date();
      this.startDate = new Date(startdate.setMonth(startdate.getMonth() - 6)).toISOString();
      this.endDate = enddate.toISOString();
      this.searchModel.StartDate = this.datePipe.transform(new Date(this.startDate ?? ''), 'yyyy-MM-dd') + "T00:00:00" ?? '';
      this.searchModel.EndDate = this.datePipe.transform(new Date(this.endDate ?? ''), 'yyyy-MM-dd') + "T00:00:00" ?? '';
      this.getData();
    });
    this.unsubscribe.push(branchData);

    this.createChart();
    this.getData();

    this.signalr.startConnection();
    this.signalr.actionListener('LoadData', (data) => {
      console.log(data)
      this.getData()
    });
  }

  createChart() {

    this.chart = new Chart("lineChart", {
      type: 'line', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: [],
        datasets: [
          {
            label: "الشكاوى",
            data: [],
            borderColor: 'blue',
            backgroundColor: 'blue'
          },
          {
            label: "القراءات",
            data: [],
            borderColor: 'limegreen',
            backgroundColor: 'limegreen'
          },
          {
            label: "التحصيلات",
            data: [],
            borderColor: 'red',
            backgroundColor: 'red'
          },
          {
            label: "التحصيلات",
            data: [],
            borderColor: 'yellow',
            backgroundColor: 'green'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

  getData() {
    if (this.isMonthly) {
      this.statisticService.getMonthlyStatisticEmployee(this.searchModel).subscribe((res: IStatisticEmployee[]) => {
        this.chart.data.labels = [];
        this.chart.data.datasets[0].data = []
        this.chart.data.datasets[1].data = []
        this.chart.data.datasets[2].data = []
        this.chart.data.datasets[3].data = []

        res.map((x) => {
          this.chart.data.datasets[0].data.push(x.complaintsCount);
          this.chart.data.datasets[1].data.push(x.meterReadingsCount);
          this.chart.data.datasets[2].data.push(x.billsPaymentCount);
          this.chart.data.datasets[3].data.push(x.updatedCustomersCount);
          this.chart.data.labels.push(x.groupedDate);
        });

        this.chart.update();
      });
    } else {
      if (this.validateDate()) {
        this.statisticService.getDailyStatisticEmployee(this.searchModel).subscribe((res: IStatisticEmployee[]) => {
          this.chart.data.labels = [];
          this.chart.data.datasets[0].data = []
          this.chart.data.datasets[1].data = []
          this.chart.data.datasets[2].data = []
          this.chart.data.datasets[3].data = []

          res.map((x) => {
            this.chart.data.datasets[0].data.push(x.complaintsCount);
            this.chart.data.datasets[1].data.push(x.meterReadingsCount);
            this.chart.data.datasets[2].data.push(x.billsPaymentCount);
            this.chart.data.datasets[3].data.push(x.updatedCustomersCount);
            this.chart.data.labels.push(x.groupedDate);
          });

          this.chart.update();
        });
      } else
        this.toster.openWarningSnackBar('لايمكن أن تتعدى الفترة فى حالة اليومى عن 15 يوم');
    }

  }

  onSelectEmployee(item: LookUpModel) {
    if (item) {
      this.searchModel.EmployeeId = item.Id;
      this.getData();
    }
  }

  getTransactionByDate() {
    if (this.startDate && this.endDate) {
      this.searchModel.StartDate = this.datePipe.transform(new Date(this.startDate ?? ''), 'yyyy-MM-dd') + "T00:00:00" ?? '';
      this.searchModel.EndDate = this.datePipe.transform(new Date(this.endDate ?? ''), 'yyyy-MM-dd') + "T00:00:00" ?? '';
      this.getData();
    } else {
      this.searchModel.StartDate = '';
      this.searchModel.EndDate = '';
    }
  }

  validateDate(): boolean {
    let startdate = new Date(this.startDate);
    let enddate = new Date(this.endDate);
    let difference = enddate.getTime() - startdate.getTime();
    difference = Math.ceil(difference / (1000 * 3600 * 24));
    return difference < 16;
  }

  changeCheck() {
    this.getData()
  }

}


export interface ISearModel {
  EmployeeId?: number | null;
  StartDate?: string;
  EndDate?: string;
}
