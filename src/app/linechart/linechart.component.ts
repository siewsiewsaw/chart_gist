import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import data from '../../gist.js'

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        }
        
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];


  constructor() { }

  ngOnInit() {
    let gistData = data
    let tempDataStore = {}

    for(let transaction of gistData){
      const date = new Date(transaction.dateAdded);
      var month = date.getMonth();
      
      const str = transaction.url.substr(0,1);
      console.log(str)
          
      for(const image of str){
        if(tempDataStore[month]){
          if(tempDataStore[month][image]){
            tempDataStore[month][image] += 1
            
          } else {
            tempDataStore[month][image] = 1
          }
        } else {
          tempDataStore[month] = {}
          tempDataStore[month][image] = 1
        } 
        
      }
  }

    let imgCount = {}
    for(const month in tempDataStore){
      this.lineChartLabels.push(month)
      for(let count in tempDataStore[month]){
        if(imgCount[count]){
          imgCount[count].push(tempDataStore[month][count])
         
        } else {
          imgCount[count]=[tempDataStore[month][count]]
        }
      } 
    }

    for(let img in imgCount){
      this.lineChartData.push(
        {data: imgCount[img], label: img}
      )
    }
   }
}
  