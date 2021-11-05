import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MonthAnalytics } from 'src/app/core/models/analytics.interface';
import * as moment from 'moment';
@Component({
  selector: 'app-pie-stats',
  templateUrl: './pie-stats.component.html',
  styleUrls: ['./pie-stats.component.scss'],
})
export class PieStatsComponent implements OnInit {
  @Input() data: Array<MonthAnalytics>;
  labels: Array<string> = [];
  dataSet: Array<number> = [];
  chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: []
  }
  constructor() {}

  setChartData(){
    var dataSet =  {
      label: 'Income',
      data: [],
      borderColor: 'rgb(0,114,191)',
      backgroundColor: 'rgb(0,114,191)',
    };

    this.data.map((data: MonthAnalytics)=> {
      dataSet.data[data.month-1]= data.income;
    })

    this.chartData.datasets.push(dataSet);
  }
  ngOnInit() {
    this.setChartData();
    Chart.register(...registerables);
    var ctx = document.getElementById('myChart') as HTMLCanvasElement;
    var myChart = new Chart(ctx, {
      type: 'line',
      data: this.chartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Income for current year'
          }
        }
      },
    }
    );
  }
}
