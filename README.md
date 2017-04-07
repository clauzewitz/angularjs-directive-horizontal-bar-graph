# angularjs-directive-horizontal-bar-graph
D3 Horizontal Bar Graph Directive

# How to use
```npm
npm install d3
```

```javascript
angular.module('app', [
  'horizontalBarChart'
]);

var chartData = {
  data1: [
          {
            name: '내 보험 질문',
            value: 18
          },
          {
            name: '내 보험 가입여부',
            value: 20
          },
          {
            name: '평균 보험 질문',
            value: 32
          },
          {
            name: '평균 보험 ',
            value: 30
          }
        ],
  data2: [
          {
            name: '내 보험 질문',
            value: 15
          },
          {
            name: '내 보험 가입여부',
            value: 10
          },
          {
            name: '평균 보험 질문',
            value: 0
          },
          {
            name: '평균 보험 ',
            value: 22
          }
        ]
};

var colors = [
  '#F7C82D',
  '#FBE99D'
];

var colors2 = [
  '#658AEC',
  '#C0D0F7'
];

<horizontal-bar-chart data="chartData" width="600" height="300" colors="colors" colors2="colors2"></horizontal-bar-chart>
```

![demo.png](/demo.png "demo")

# License
MIT License
