
// =========================
// VARIABLES GLOBALES
// =========================

let barChart;
let lineChart;
let successChart;
let failChart;
let gauge1;
let gauge2;


// =========================
// RANDOM
// =========================

function random(min, max){

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;
}


// =========================
// DATOS DINAMICOS
// =========================

function generarDatos(){

    return {

        workstationStatus: {

            labels: [
                'Item 1',
                'Item 2',
                'Item 3',
                'Item 4',
                'Item 5',
                'Item 6',
                'Item 7'
            ],

            series1: Array.from({length:7}, () =>
                random(5,20)
            ),

            series2: Array.from({length:7}, () =>
                random(5,20)
            )
        },

        workstationHistory: {

            labels:['1','2','3','4','5','6'],

            red: Array.from({length:6}, () =>
                random(1,25)
            ),

            green: Array.from({length:6}, () =>
                random(1,25)
            ),

            yellow: Array.from({length:6}, () =>
                random(1,25)
            )
        },

        networkStatus:{
            successful: random(60,100),
            failing: random(0,40)
        },

        alerts: random(1,50),
        downCount: random(1,20),
        responseTime: random(1000,5000)
    };
}


// =========================
// CREAR CHARTS SOLO UNA VEZ
// =========================

function initCharts(){

    // =========================
    // BAR CHART
    // =========================

    barChart = new Chart(
        document.getElementById('barChart'),
        {

            type:'bar',

            data:{

                labels:[],

                datasets:[

                    {
                        label:'Series 1',
                        data:[],
                        backgroundColor:'#ff5a76',
                        borderRadius:8
                    },

                    {
                        label:'Series 2',
                        data:[],
                        backgroundColor:'#8dff3d',
                        borderRadius:8
                    }
                ]
            },

            options:{

                responsive:true,

                animation:{
                    duration:1200,
                    easing:'easeInOutQuart'
                },

                plugins:{
                    legend:{
                        labels:{
                            color:'white'
                        }
                    }
                },

                scales:{

                    x:{
                        ticks:{
                            color:'white'
                        },

                        grid:{
                            display:false
                        }
                    },

                    y:{
                        ticks:{
                            color:'white'
                        },

                        grid:{
                            color:'rgba(255,255,255,.1)'
                        }
                    }
                }
            }
        }
    );


    // =========================
    // LINE CHART
    // =========================

    lineChart = new Chart(
        document.getElementById('lineChart'),
        {

            type:'line',

            data:{

                labels:[],

                datasets:[

                    {
                        label:"Red",
                        data:[],
                        borderColor:'#ff5a76',
                        backgroundColor:'rgba(255,90,118,.4)',
                        fill:true,
                        tension:.4
                    },

                    {
                        label:"Green",
                        data:[],
                        borderColor:'#8dff3d',
                        backgroundColor:'rgba(141,255,61,.3)',
                        fill:true,
                        tension:.4
                    },

                    {
                        label:"Yellow",
                        data:[],
                        borderColor:'#ffd34d',
                        backgroundColor:'rgba(255,211,77,.3)',
                        fill:true,
                        tension:.4
                    }
                ]
            },

            options:{

                responsive:true,

                animation:{
                    duration:1200,
                    easing:'easeInOutQuart'
                },

                plugins:{
                    legend:{
                        labels:{
                            color:'white'
                        }
                    }
                },

                scales:{

                    x:{
                        ticks:{
                            color:'white'
                        },

                        grid:{
                            display:false
                        }
                    },

                    y:{
                        ticks:{
                            color:'white'
                        },

                        grid:{
                            color:'rgba(255,255,255,.1)'
                        }
                    }
                }
            }
        }
    );


    // =========================
    // DONUT SUCCESS
    // =========================

    successChart = new Chart(
        document.getElementById('successChart'),
        {

            type:'doughnut',

            data:{
                datasets:[{
                    data:[0,100],
                    backgroundColor:[
                        '#89ff38',
                        '#ead8e9'
                    ],
                    borderWidth:0
                }]
            },

            options:{

                cutout:'70%',

                animation:{
                    duration:1200,
                    easing:'easeInOutQuart'
                },

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

                    ctx.save();

                    ctx.font = "bold 28px Poppins";
                    ctx.fillStyle = "white";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";

                    const value =
                        chart.data.datasets[0].data[0];

                    ctx.fillText(
                        value,
                        width / 2,
                        height / 2
                    );

                    ctx.restore();
                }

            }]
        }
    );


    // =========================
    // DONUT FAIL
    // =========================

    failChart = new Chart(
        document.getElementById('failChart'),
        {

            type:'doughnut',

            data:{
                datasets:[{
                    data:[0,100],
                    backgroundColor:[
                        '#ff4c68',
                        '#ead8e9'
                    ],
                    borderWidth:0
                }]
            },

            options:{

                cutout:'70%',

                animation:{
                    duration:1200,
                    easing:'easeInOutQuart'
                },

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

                    ctx.save();

                    ctx.font = "bold 28px Poppins";
                    ctx.fillStyle = "white";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";

                    const value =
                        chart.data.datasets[0].data[0];

                    ctx.fillText(
                        value,
                        width / 2,
                        height / 2
                    );

                    ctx.restore();
                }

            }]
        }
    );
    // =========================
    // GAUGE 1
    // =========================

    gauge1 = new Chart(
        document.getElementById('gauge1'),
        {

            type:'doughnut',

            data:{
                datasets:[{
                    data:[70,30],
                    backgroundColor:[
                        '#ffc400',
                        'rgba(255,255,255,.12)'
                    ],
                    borderWidth:0
                }]
            },

            options:{

                responsive:true,
                maintainAspectRatio:false,

                rotation:-90,
                circumference:180,

                cutout:'75%',

                plugins:{
                    legend:{
                        display:false
                    },

                    tooltip:{
                        enabled:false
                    }
                }
            }
        }
    );


    // =========================
    // GAUGE 2
    // =========================

    gauge2 = new Chart(
        document.getElementById('gauge2'),
        {

            type:'doughnut',

            data:{
                datasets:[{
                    data:[25,75],
                    backgroundColor:[
                        '#ff5a76',
                        'rgba(255,255,255,.12)'
                    ],
                    borderWidth:0
                }]
            },

            options:{

                responsive:true,
                maintainAspectRatio:false,

                rotation:-90,
                circumference:180,

                cutout:'75%',

                plugins:{
                    legend:{
                        display:false
                    },

                    tooltip:{
                        enabled:false
                    }
                }
            }
        }
    );
}


// =========================
// ACTUALIZAR CHARTS
// =========================

function updateDashboard(data){

    // =========================
    // BAR CHART
    // =========================

    barChart.data.labels =
        data.workstationStatus.labels;

    barChart.data.datasets[0].data =
        data.workstationStatus.series1;

    barChart.data.datasets[1].data =
        data.workstationStatus.series2;

    barChart.update();


    // =========================
    // LINE CHART
    // =========================

    lineChart.data.labels =
        data.workstationHistory.labels;

    lineChart.data.datasets[0].data =
        data.workstationHistory.red;

    lineChart.data.datasets[1].data =
        data.workstationHistory.green;

    lineChart.data.datasets[2].data =
        data.workstationHistory.yellow;

    lineChart.update();


    // =========================
    // DONUTS
    // =========================

    successChart.data.datasets[0].data = [
        data.networkStatus.successful,
        100 - data.networkStatus.successful
    ];

    successChart.update();


    failChart.data.datasets[0].data = [
        data.networkStatus.failing,
        100 - data.networkStatus.failing
    ];

    failChart.update();

    // =========================
    // UPDATE GAUGES
    // =========================

    gauge1.data.datasets[0].data = [
        data.alerts,
        100 - data.alerts
    ];

    gauge1.update();


    const downValue = data.downCount * 5;

    gauge2.data.datasets[0].data = [
        downValue,
        100 - downValue
    ];

    gauge2.update();


    // =========================
    // TEXTOS
    // =========================

    document.getElementById('alertCount').textContent =
        data.alerts;

    document.getElementById('downCount').textContent =
        data.downCount;

    document.getElementById('responseTime').textContent =
        data.responseTime;
}


// =========================
// ACTUALIZAR
// =========================

function actualizarDashboard(){

    const data = generarDatos();

    updateDashboard(data);
}


// =========================
// INICIAR
// =========================

initCharts();

actualizarDashboard();


// =========================
// ACTUALIZAR CADA 5 SEGUNDOS
// =========================

setInterval(actualizarDashboard, 5000);

