import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import data from '../../gist.js'

interface GistData {
  tags: [];
}

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)','yellow','red','orange','green','magenta'],
    },
  ];

  constructor() { }

  ngOnInit() {
    const GistData = data
     
    let count = {}
    for(const x of GistData){
      
      for( const tagName of x.tags){
        if (count[tagName]) {
            count[tagName] += 1
        } else {
            count[tagName] = 1
        }
      }
    }

    for (const key in count) {
      this.pieChartLabels.push(key)
      const numCount = count[key]
      this.pieChartData.push(numCount)
      console.log(key, numCount)
    }
  } 
}
