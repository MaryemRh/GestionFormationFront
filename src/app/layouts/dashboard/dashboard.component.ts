import { Component, OnInit } from '@angular/core';
import { LegendTitle } from '@progress/kendo-angular-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
  }

  public series: any[] = [
    {
      name: "RH",
      data: [
        3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.89, 8.238, 9.552, 6.855,
      ],
    },
    {
      name: "IT",
      data: [4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, 7.832, 4.3, 4.3],
    },
    {
      name: "Innovation",
      data: [
        0.01, 0.375, 1.161, 0.684, 3.7, 3.269, 1.083, 5.127, 3.69, 2.995,
      ],
    },
  ];

  public categories: number[] = [
    2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
  ];

  public legendTitle: LegendTitle = {
    text: "Activités",
    font: "18px Arial",
  };
}
