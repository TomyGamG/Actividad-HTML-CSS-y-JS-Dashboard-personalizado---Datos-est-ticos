// =========================
// BAR CHART
// =========================

new Chart(document.getElementById('barChart'), {
  type: 'bar',

  data: {
    labels: dashboardData.workstationStatus.labels,

    datasets: [
      {
        label:'Series 1',
        data: dashboardData.workstationStatus.series1,
        backgroundColor:'#ff5a76',
        borderRadius:8
      },

      {
        label:'Series 2',
        data: dashboardData.workstationStatus.series2,
        backgroundColor:'#8dff3d',
        borderRadius:8
      }
    ]
  },

  options:{
    responsive:true,
    maintainAspectRatio:true,

    plugins:{
      legend:{
        labels:{
          color:'white'
        }
      }
    },

    scales:{
      x:{
        ticks:{ color:'white' },
        grid:{ display:false }
      },

      y:{
        ticks:{ color:'white' },
        grid:{ color:'rgba(255,255,255,.1)' }
      }
    }
  }
});


// =========================
// LINE CHART
// =========================

new Chart(document.getElementById('lineChart'), {

  type:'line',

  data:{
    labels: dashboardData.workstationHistory.labels,

    datasets:[
      {
        data: dashboardData.workstationHistory.red,
        borderColor:'#ff5a76',
        backgroundColor:'rgba(255,90,118,.4)',
        fill:true,
        tension:.4
      },

      {
        data: dashboardData.workstationHistory.green,
        borderColor:'#8dff3d',
        backgroundColor:'rgba(141,255,61,.3)',
        fill:true,
        tension:.4
      },

      {
        data: dashboardData.workstationHistory.yellow,
        borderColor:'#ffd34d',
        backgroundColor:'rgba(255,211,77,.3)',
        fill:true,
        tension:.4
      }
    ]
  },

  options:{
    responsive:true,
    maintainAspectRatio:true,

    plugins:{
      legend:{
        display:false
      }
    },

    scales:{
      x:{
        ticks:{ display:false },
        grid:{ display:false }
      },

      y:{
        ticks:{ display:false },
        grid:{ color:'rgba(255,255,255,.1)' }
      }
    }
  }

});


// =========================
// DONUT CHARTS
// =========================

function donutChart(id, value, color){

  new Chart(document.getElementById(id), {

    type:'doughnut',

    data:{
      datasets:[{
        data:[value,100-value],
        backgroundColor:[color,'#ead8e9'],
        borderWidth:0
      }]
    },

    options:{
      cutout:'70%',

      plugins:{
        legend:{ display:false },
        tooltip:{ enabled:false }
      }
    },

    plugins:[{

      id:'text',

      beforeDraw(chart){

        const {ctx} = chart;
        const width = chart.width;
        const height = chart.height;

        ctx.restore();

        ctx.font = "bold 30px Poppins";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(value, width / 2, height / 2);

        ctx.save();
      }

    }]
  });
}

donutChart(
  'successChart',
  dashboardData.networkStatus.successful,
  '#89ff38'
);
donutChart(
  'failChart',
  dashboardData.networkStatus.failing,
  '#ff4c68'
);


// =========================
// GAUGES
// =========================

function gauge(id, value, color){

  new Chart(document.getElementById(id),{

    type:'doughnut',

    data:{
      datasets:[{
        data:[value,100-value],
        backgroundColor:[color,'rgba(255,255,255,.15)'],
        borderWidth:0
      }]
    },

    options:{
      rotation:-90,
      circumference:180,
      cutout:'75%',

      plugins:{
        legend:{ display:false },
        tooltip:{ enabled:false }
      }
    }

  });
}

gauge('gauge1',70,'#ffc400');
gauge('gauge2',25,'#ff5a76');

document.getElementById('alertCount').textContent =
dashboardData.alerts;

document.getElementById('downCount').textContent =
dashboardData.downCount;

document.getElementById('responseTime').textContent =
dashboardData.responseTime;