const axios = require('axios')

exports.getMetrics = (req, res) => {

    axios('http://test.dev.irisns.com/').then((response) => { 
    if(response.data.success) {
        const metricsData = response.data.data;
        const metricsDataPoints = response.data.data.data;

        const labels = metricsDataPoints.reduce((filtered, object) => {filtered.push(object[3]);return filtered;}, []).flat(1);
        let tempArray = [
            {
                label: 'Bps in',
                data: labels.map(() => metricsDataPoints.reduce((filtered, object) => {filtered.push(object[0]);return filtered;}, [])).flat(1),
                borderColor: metricsData.plots[0].colour,
                backgroundColor: metricsData.plots[0].colour,
            },
            {
                label: 'Bps out',
                data: labels.map(() => metricsDataPoints.reduce((filtered, object) => {filtered.push(object[1]);return filtered;}, [])).flat(1),
                borderColor: metricsData.plots[1].colour,
                backgroundColor: metricsData.plots[1].colour,
            },
            {
                label: 'Packets in ',
                data: labels.map(() => metricsDataPoints.reduce((filtered, object) => {filtered.push(object[2]);return filtered;}, [])).flat(1),
                borderColor: metricsData.plots[5].colour,
                backgroundColor: metricsData.plots[5].colour,
            },
            {
                label: 'Packets out',
                data: labels.map(() => metricsDataPoints.reduce((filtered, object) => {filtered.push(object[3]);return filtered;}, [])).flat(1),
                borderColor: metricsData.plots[6].colour,
                backgroundColor: metricsData.plots[6].colour,
            },
            {
                label: 'Speed',
                data: labels.map(() => metricsDataPoints.reduce((filtered, object) => {filtered.push(object[4]);return filtered;}, [])).flat(1),
                borderColor: metricsData.plots[3].colour,
                backgroundColor: metricsData.plots[3].colour,
            }
    
        ];

        res.status(200).send({ tablesets: metricsDataPoints, datasets:tempArray, labels: labels, message: "APi call suceess" });
    }
    else {
        res.status(500).send({ message: 'Server error'});
    }
    }).catch(function (err) {
        console.log(err);
        res.status(500).send({ message: 'Server error'});
    });
};


