export interface CurrentWeather { 
    city: string;
    temperature: number;
    description: string;
    icon: string;
    humidity: number;
    windSpeed: number;
}

export interface ForecasteDay {
    date: string;
    temperature: number;
    description: string;
    icon: string;
}

export interface WeatherForecast {
    city: string;
    days: ForecasteDay[];
}