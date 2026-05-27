let charts = [];


// =========================
// RANDOM
// =========================

function random(min, max){

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;
}


// =========================
// CARGAR DATOS DESDE API
// =========================

async function cargarDatos(){

    try{

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        const users = await response.json();

        return {

            workstationStatus: {

                labels: users.map(user => user.username),

                series1: users.map(() =>
                    random(1,50)
                ),

                series2: users.map(() =>
                    random(1,50)
                )
            },

            workstationHistory:{

                labels:['1','2','3','4','5','6'],

                red:[
                    random(1,20),
                    random(1,20),
                    random(1,20),
                    random(1,20),
                    random(1,20),
                    random(1,20)
                ],

                green:[
                    random(1,20),
                    random(1,20),
                    random(1,20),
                    random(1,20),
                    random(1,20),
                    random(1,20)
                ],

                yellow:[
                    random(1,20),
                    random(1,20),
                    random(1,20),
                    random(1,20),
                    random(1,20),
                    random(1,20)
                ]
            },

            networkStatus:{
                successful: random(60,100),
                failing: random(0,40)
            },

            alerts: random(1,50),
            downCount: random(1,20),
            responseTime: random(1000,5000)
        };

    }catch(error){

        console.error("Error cargando datos:", error);
    }
}


// =========================
// CREAR DASHBOARD
// =========================

function createDashboard(dashboardData) {

    // BORRAR CHARTS ANTERIORES
    charts.forEach(chart => chart.destroy());

    charts = [];


    // =========================
    // BAR CHART
    // =========================

    const barChart = new Chart(document.getElementById('barChart'), {

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
    });

    charts.push(barChart);


    // =========================
    // LINE CHART
    // =========================

    const lineChart = new Chart(document.getElementById('lineChart'), {

        type:'line',

        data:{

            labels: dashboardData.workstationHistory.labels,

            datasets:[

                {
                    label:"Red",
                    data: dashboardData.workstationHistory.red,
                    borderColor:'#ff5a76',
                    backgroundColor:'rgba(255,90,118,.4)',
                    fill:true,
                    tension:.4
                },

                {
                    label:"Green",
                    data: dashboardData.workstationHistory.green,
                    borderColor:'#8dff3d',
                    backgroundColor:'rgba(141,255,61,.3)',
                    fill:true,
                    tension:.4
                },

                {
                    label:"Yellow",
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

    });

    charts.push(lineChart);


    // =========================
    // DONUT CHARTS
    // =========================

    function donutChart(id, value, color){

        const chart = new Chart(document.getElementById(id), {

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

                    ctx.fillText(
                        value,
                        width / 2,
                        height / 2
                    );

                    ctx.save();
                }

            }]
        });

        charts.push(chart);
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
                borderWidth:0,
                borderRadius:10
            }]
        },

        options:{

            responsive:true,
            maintainAspectRatio:false,

            rotation:270,
            circumference:180,

            cutout:'75%',

            plugins:{
                legend:{ display:false },
                tooltip:{ enabled:false }
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
                borderWidth:0,
                borderRadius:10
            }]
        },

        options:{

            responsive:true,
            maintainAspectRatio:false,

            rotation:270,
            circumference:180,

            cutout:'75%',

            plugins:{
                legend:{ display:false },
                tooltip:{ enabled:false }
            }
        }
    }
);


    // =========================
    // TEXTOS
    // =========================

    document.getElementById('alertCount').textContent =
    dashboardData.alerts;

    document.getElementById('downCount').textContent =
    dashboardData.downCount;

    document.getElementById('responseTime').textContent =
    dashboardData.responseTime;
}


// =========================
// ACTUALIZAR DASHBOARD
// =========================

async function actualizarDashboard(){

    const data = await cargarDatos();

    if(data){
        createDashboard(data);
    }
}


// =========================
// INICIAR
// =========================

actualizarDashboard();


// =========================
// ACTUALIZAR CADA 5 SEGUNDOS
// =========================

setInterval(actualizarDashboard, 5000);