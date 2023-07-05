/* ========== Dashboard =============== */

const ctxVento = document.getElementById('myChart');

const dataVento = {
    "06:00": 0,
    "09:00": 7,
    "12:00": 22,
    "15:00": 13,
    "18:00": 18,
    "21:00": 29,
    "00:00": 31
}

new Chart(ctxVento, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: '',
            data: dataVento,
            fill: false,
            borderColor: '#E2A348',
            tension: 0.4,
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const ctxPrecipitacao = document.getElementById('myChart-precipitacao');

const dataPrecipitacao = {
    "06:00": 825,
    "09:00": 686,
    "12:00": 509,
    "15:00": 746,
    "18:00": 501,
    "21:00": 770,
    "00:00": 442
}

new Chart(ctxPrecipitacao, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: '',
            data: dataPrecipitacao,
            fill: false,
            borderColor: '#E2A348',
            tension: 0.4,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


/* ========== Mapa =============== */

const dataFieldValues = {
    "temperature": {
        "Celcius": [-34, -23, -12, -1, 10, 21, 32, 43, 49],
        "Fahrenheit": [-30, -10, 10, 30, 50, 70, 90, 110, 120],
    },
    "dewPoint": {
        "Celcius": [-34, -23, -12, -1, 10, 21, 32, 43, 49],
        "Fahrenheit": [-30, -10, 10, 30, 50, 70, 90, 110, 120],
    },
    "humidity": {
        "%": [10, 20, 30, 40, 50, 60, 70, 80, 100],
    },
    "windSpeed": {
        "km/h": [0, 8, 16, 32, 56, 72, 96, 114, 129],
        "m/s": [0, 5, 10, 20, 35, 45, 60, 70, 80],
    },
    "windGust": {
        "km/h": [0, 8, 16, 32, 56, 72, 96, 114, 129],
        "m/s": [0, 5, 10, 20, 35, 45, 60, 70, 80],
    },
    "cloudCover": {
        "%": [10, 20, 30, 40, 50, 60, 70, 80, 100],
    }
}


function changeDataField(data) {


    mapboxgl.accessToken = 'pk.eyJ1Ijoicm9uaS1zaGFsZXYiLCJhIjoiY2thaDEzdGwyMDN1ejJzdGl5Z3Nhems1ZCJ9.C36_Th7LAixAB1t6WHodMw';

    // get your key from app.tomorrow.io/development/keys
    const API_KEY = 'Da9FQEIR57JoP3mH72fNbJCzjvxBLrFH';

    // pick the field (like temperature, precipitationIntensity or cloudCover)
    const DATA_FIELD = data;

    // set the ISO timestamp (now for all fields, up to 6 hour out for precipitationIntensity)
    const TIMESTAMP = (new Date()).toISOString();

    // initialize the map
    var map = (window.map = new mapboxgl.Map({
        container: 'map',
        zoom: 1,
        center: [7.5, 58],
        style: 'mapbox://styles/mapbox/dark-v10',
        antialias: true
    }));

    const labelLayer = 'country-label'; // Substitua 'country-label' pelo nome correto da camada de rótulos no seu código.
    const fontSize = 44; // Tamanho da fonte desejado

    // inject the tile layer
    map.on('load', function () {

        map.addSource(`tomorrow-io-api`, {
            "type": 'raster',
            "tiles": [`https://api.tomorrow.io/v4/map/tile/{z}/{x}/{y}/${DATA_FIELD}/${TIMESTAMP}.png?apikey=${API_KEY}`],
            "tileSize": 256,
            "attribution": '&copy; <a href="https://www.tomorrow.io/weather-api">Powered by Tomorrow.io</a>'
        });
        map.addLayer({
            "id": `${DATA_FIELD}-tiles`,
            "type": "raster",
            "source": "tomorrow-io-api",
            "minzoom": 1,
            "maxzoom": 12
        });
    });

    var mapLegenda = document.querySelector('#article-map-legenda .docker-info .title');
    mapLegenda.innerHTML = DATA_FIELD;

    var titleCamada = document.querySelector('#article-map-legenda .docker-info .title');
    var unitCamada = document.querySelector('#article-map-legenda .graph .info p');
    var legenda = document.querySelectorAll('#article-map-legenda .graph .legenda span');

    var btnDataFieldTemperature = document.getElementById('btn-camada-temperature')
    var btnDataFieldDewpoint = document.getElementById('btn-camada-dewPoint')
    var btnDataFieldHumidity = document.getElementById('btn-camada-humidity')
    var btnDataFieldWindSpeed = document.getElementById('btn-camada-windSpeed')
    var btnDataFieldWindGust = document.getElementById('btn-camada-windGust')
    var btnDataFieldCloudCover = document.getElementById('btn-camada-cloudCover')
    var btnDataFieldNone = document.getElementById('btn-camada-none')
    var barProgressLegendaMap = document.getElementById('bar-legend-map')

    if (data == 'temperature' || data == 'dewPoint') {

        if (data == 'temperature') {
            btnDataFieldTemperature.style.backgroundColor = '#E2A348';
            btnDataFieldDewpoint.style.backgroundColor = '#D9D9D9';
            btnDataFieldHumidity.style.backgroundColor = '#D9D9D9';
            btnDataFieldWindSpeed.style.backgroundColor = '#D9D9D9';
            btnDataFieldWindGust.style.backgroundColor = '#D9D9D9';
            btnDataFieldCloudCover.style.backgroundColor = '#D9D9D9';
            btnDataFieldNone.style.backgroundColor = '#D9D9D9';
            barProgressLegendaMap.style.background = "linear-gradient(30deg, #963FC4, #317FB2, #42C05A, #EB8813, #A61A05)"
        } else if (data == 'dewPoint') {
            btnDataFieldTemperature.style.backgroundColor = '#D9D9D9';
            btnDataFieldDewpoint.style.backgroundColor = '#E2A348';
            btnDataFieldHumidity.style.backgroundColor = '#D9D9D9';
            btnDataFieldWindSpeed.style.backgroundColor = '#D9D9D9';
            btnDataFieldWindGust.style.backgroundColor = '#D9D9D9';
            btnDataFieldCloudCover.style.backgroundColor = '#D9D9D9';
            btnDataFieldNone.style.backgroundColor = '#D9D9D9';
            barProgressLegendaMap.style.background = "linear-gradient(30deg, #963FC4, #317FB2, #42C05A, #EB8813, #A61A05)"
        }

        titleCamada.innerHTML = data;
        unitCamada.innerHTML = '°C'

        for (var i = 0; i < legenda.length; i++) {
            legenda[i].innerHTML = dataFieldValues[data]['Celcius'][i]
        }

    } else if (data == 'humidity' || data == 'cloudCover') {

        if (data == 'humidity') {
            btnDataFieldTemperature.style.backgroundColor = '#D9D9D9';
            btnDataFieldDewpoint.style.backgroundColor = '#D9D9D9';
            btnDataFieldHumidity.style.backgroundColor = '#E2A348';
            btnDataFieldWindSpeed.style.backgroundColor = '#D9D9D9';
            btnDataFieldWindGust.style.backgroundColor = '#D9D9D9';
            btnDataFieldCloudCover.style.backgroundColor = '#D9D9D9';
            btnDataFieldNone.style.backgroundColor = '#D9D9D9';
            barProgressLegendaMap.style.background = 'linear-gradient(30deg, #FFF5C6, #FED88B, #BF9461, #7E4558, #51105F)';
        } else if (data == 'cloudCover') {
            btnDataFieldTemperature.style.backgroundColor = '#D9D9D9';
            btnDataFieldDewpoint.style.backgroundColor = '#D9D9D9';
            btnDataFieldHumidity.style.backgroundColor = '#D9D9D9';
            btnDataFieldWindSpeed.style.backgroundColor = '#D9D9D9';
            btnDataFieldWindGust.style.backgroundColor = '#D9D9D9';
            btnDataFieldCloudCover.style.backgroundColor = '#E2A348';
            btnDataFieldNone.style.backgroundColor = '#D9D9D9';
            barProgressLegendaMap.style.background = 'linear-gradient(30deg, #D8E6F7, #BDD5EF, #639BDA, #3B71AD , #58636F)';
        }

        titleCamada.innerHTML = data;
        unitCamada.innerHTML = '%';

        for (var i = 0; i < legenda.length; i++) {
            legenda[i].innerHTML = dataFieldValues[data]['%'][i]
        }

    } else if (data == 'windSpeed' || data == 'windGust') {

        if (data == 'windSpeed') {
            btnDataFieldTemperature.style.backgroundColor = '#D9D9D9';
            btnDataFieldDewpoint.style.backgroundColor = '#D9D9D9';
            btnDataFieldHumidity.style.backgroundColor = '#D9D9D9';
            btnDataFieldWindSpeed.style.backgroundColor = '#E2A348';
            btnDataFieldWindGust.style.backgroundColor = '#D9D9D9';
            btnDataFieldCloudCover.style.backgroundColor = '#D9D9D9';
            btnDataFieldNone.style.backgroundColor = '#D9D9D9';
            barProgressLegendaMap.style.background = 'linear-gradient(30deg, #FDFAAA, #BEDD8C, #577CDB, #4B247B, #270648)';
        } else if (data == 'windGust') {
            btnDataFieldTemperature.style.backgroundColor = '#D9D9D9';
            btnDataFieldDewpoint.style.backgroundColor = '#D9D9D9';
            btnDataFieldHumidity.style.backgroundColor = '#D9D9D9';
            btnDataFieldWindSpeed.style.backgroundColor = '#D9D9D9';
            btnDataFieldWindGust.style.backgroundColor = '#E2A348';
            btnDataFieldCloudCover.style.backgroundColor = '#D9D9D9';
            btnDataFieldNone.style.backgroundColor = '#D9D9D9';
            barProgressLegendaMap.style.background = 'linear-gradient(30deg, #FDFAAA, #BEDD8C, #577CDB, #4B247B, #270648)';
        }
        titleCamada.innerHTML = data;
        unitCamada.innerHTML = 'km/h';

        for (var i = 0; i < legenda.length; i++) {
            legenda[i].innerHTML = dataFieldValues[data]['km/h'][i]
        }

    } else if (data == 'none') {
        btnDataFieldTemperature.style.backgroundColor = '#D9D9D9';
        btnDataFieldDewpoint.style.backgroundColor = '#D9D9D9';
        btnDataFieldHumidity.style.backgroundColor = '#D9D9D9';
        btnDataFieldWindSpeed.style.backgroundColor = '#D9D9D9';
        btnDataFieldWindGust.style.backgroundColor = '#D9D9D9';
        btnDataFieldCloudCover.style.backgroundColor = '#D9D9D9';
        btnDataFieldNone.style.backgroundColor = '#E2A348';
        titleCamada.innerHTML = 'Sem filtro';
        unitCamada.innerHTML = '';
        barProgressLegendaMap.style.background = 'none';
        for (var i = 0; i < legenda.length; i++) {
            legenda[i].innerHTML = ''
        }

    }
}

changeDataField('none');
