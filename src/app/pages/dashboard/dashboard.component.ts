import { Component, OnInit } from '@angular/core';
import { AnalyticsIncome, CountryAnalytics, MonthAnalytics } from 'src/app/core/models/analytics.interface';
import { BlockStats } from 'src/app/core/models/dashboard/block-stats.model';
import { AnalyticsService } from 'src/app/core/services/analytics.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  block_stats: Array<BlockStats> = [];
  monthData: Array<MonthAnalytics> = null ;
  countryData: Array<CountryAnalytics> = null ;
  loaded: boolean = false;
  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
    this.getIncomeAnalytics();
  }

  getIncomeAnalytics(){
    this.analyticsService.getIncomeStats().subscribe((data: AnalyticsIncome) => {
      this.block_stats.push(
        new BlockStats({
          statData: data.income,
          statName: 'Income',
        }),
        new BlockStats({
          statData: data.lastMonthIncome,
          statName: 'Last Month Income',
        }), new BlockStats({
          statData: data.lastYearIncome,
          statName: 'Last Year Income',
        })
      );
      this.getCountryAnalytics();
    })
  }

  getCountryAnalytics(){
    this.analyticsService.getCountryStats().subscribe((data: Array<CountryAnalytics>) => {
     this.countryData = data;
    this.getMonthlyAnalytics();
    })
  }

  getMonthlyAnalytics(){
    this.analyticsService.getMonthStats().subscribe((data: Array<MonthAnalytics>) => {
      this.monthData = data;
      this.loaded = true;
    })
  }


}
