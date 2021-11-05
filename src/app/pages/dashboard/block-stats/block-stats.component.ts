import { Component, Input, OnInit } from '@angular/core';
import { BlockStats } from 'src/app/core/models/dashboard/block-stats.model';

@Component({
  selector: 'app-block-stats',
  templateUrl: './block-stats.component.html',
  styleUrls: ['./block-stats.component.scss']
})
export class BlockStatsComponent implements OnInit {
  @Input() data: BlockStats;
  constructor() { }

  ngOnInit() {
  }

}
