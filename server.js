const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

function random(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.get("/api/dashboard", (req, res) => {

    res.json({

        workstationStatus: {

            labels:['A','B','C','D','E','F'],

            series1:[
                random(5,50),
                random(5,50),
                random(5,50),
                random(5,50),
                random(5,50),
                random(5,50)
            ],

            series2:[
                random(5,50),
                random(5,50),
                random(5,50),
                random(5,50),
                random(5,50),
                random(5,50)
            ]
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
    });

});

app.listen(3000, () => {
    console.log("Servidor iniciado en puerto 3000");
});