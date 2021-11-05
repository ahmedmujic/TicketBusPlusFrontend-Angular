import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CountryAnalytics } from 'src/app/core/models/analytics.interface';

@Component({
  selector: 'app-pie-country-stats',
  templateUrl: './pie-country-stats.component.html',
  styleUrls: ['./pie-country-stats.component.scss']
})
export class PieCountryStatsComponent implements OnInit {

  @Input() data: Array<CountryAnalytics>;
  dataChart = {
    labels: [],
    datasets: [{
      label: 'My First Dataset',
      data: [],
      backgroundColor: [
        'rgb(0,114,191)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

  constructor() { }

  ngOnInit() {
    this.data.map((country: CountryAnalytics)=> {
      this.dataChart.labels.push(country.countryName);
      this.dataChart.datasets[0].data.push(country.income);
    })
    Chart.register(...registerables);
    var ctx = document.getElementById('Chart1') as HTMLCanvasElement;
    var Chart1 = new Chart(ctx, {
      type: 'doughnut',
      data: this.dataChart,
    }
    );
  }

}
