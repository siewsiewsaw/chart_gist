import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import data from '../../gist.js';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [];


  constructor() { }
  ngOnInit() {
    let gistData = data
    let tempDataStore = {}

    for(let transaction of gistData){
      const tag = transaction.tags 
      
      var date = new Date(transaction.dateAdded);
      var month = date.getMonth();
      
      const likes = transaction.likes
     
      for(const tagName of tag){
        if(tempDataStore[month]){
          if(tempDataStore[month][tagName]){
            tempDataStore[month][tagName] += likes
          } else {
            tempDataStore[month][tagName] = likes
          }
        } else {
          tempDataStore[month] = {}
          tempDataStore[month][tagName] = likes
        } 
      
      }
  }

    let tagsCount = {}
    for(const month in tempDataStore){
      this.barChartLabels.push(month)
      for(let likes in tempDataStore[month]){
        if(tagsCount[likes]){
          tagsCount[likes].push(tempDataStore[month][likes])
        } else {
          tagsCount[likes]= [tempDataStore[month][likes]]
        }
      } 
    }

    for(let tag in tagsCount){
      this.barChartData.push(
        {data: tagsCount[tag], label: tag}
      )
    }
 
  }
}  