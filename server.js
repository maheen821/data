const fs = require('fs');

function generateRealisticClimateData(count) {
    const data = [];
    const cities = [
        { name: "Karachi", lat: 24.8607, lon: 67.0011 },
        { name: "Lahore", lat: 31.5204, lon: 74.3587 },
        { name: "Islamabad", lat: 33.6844, lon: 73.0479 }
    ];
    const conditions = ["Clear", "Cloudy", "Rainy", "Foggy", "Stormy"];
    const startTime = new Date('2026-01-01T00:00:00Z').getTime();

    for (let i = 0; i < count; i++) {
        const city = cities[Math.floor(Math.random() * cities.length)];
        const temp = parseFloat((15 + Math.random() * 30).toFixed(1));
        
        // Random values for various columns
        data.push({
            record_id: i + 1,
            timestamp: new Date(startTime + (i * 3600000)).toISOString(),
            station_id: city.name,
            latitude: city.lat,
            longitude: city.lon,
            
            // Atmospheric Measurements
            temperature_c: temp,
            dew_point_c: parseFloat((temp - 5 - Math.random() * 5).toFixed(1)),
            humidity_percent: Math.floor(30 + Math.random() * 60),
            atmospheric_pressure_hpa: Math.floor(990 + Math.random() * 30),
            sea_level_pressure: Math.floor(1000 + Math.random() * 20),
            
            // Wind and Precipitation
            wind_speed_kmh: parseFloat((Math.random() * 50).toFixed(1)),
            wind_direction: Math.floor(Math.random() * 360),
            precipitation_mm: parseFloat((Math.random() * 10).toFixed(1)),
            snowfall_mm: 0, // Pakistan ke cities ke liye mostly 0
            
            // Environmental & Visibility
            visibility_km: Math.floor(1 + Math.random() * 10),
            uv_index: Math.floor(Math.random() * 12),
            co2_ppm: Math.floor(400 + Math.random() * 150),
            air_quality_index: Math.floor(50 + Math.random() * 200),
            
            // Derived & Labeling
            weather_condition: conditions[Math.floor(Math.random() * conditions.length)],
            anomaly_flag: (temp > 40 || Math.random() > 0.95) ? 1 : 0,
            season: "Summer" 
        });
    }
    return data;
}

// 400 data points generate karna
const climateData = generateRealisticClimateData(400);

// JSON file mein write karna
fs.writeFile('climate_data.json', JSON.stringify(climateData, null, 2), (err) => {
    if (err) {
        console.error('Error writing file:', err);
    } else {
        console.log('Success: "climate_data.json" file 400 records ke saath create ho gayi hai.');
    }
});