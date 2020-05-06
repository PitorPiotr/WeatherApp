import React from 'react';
import './Weather.css' 

const api ={
    key: '04228ef16dec3ce263a2bf083ccf4361',
    base: 'http://api.openweathermap.org/data/2.5/'
        }

const dateBuilder = (d) => {
    let months = ["Stycznia", "Lutego", "Marca", "Kwietnia", "Maja", "Czerwca", "Lipca", "Sierpnia", "Września", 
    "Pażdziernika", "Listopada", "Grudnia"];
    let days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"]; 
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();  
     return `${day} ${date} ${month} ${year}`
  }

class Weather extends React.Component {
    constructor(props) {
        super();
        this.state=
        {term:'',
        city:"",
        date: "",
        temp:"",
        feelslike:"",
        maxtemp: "",
        mintemp: "",
        humidity:"",
        pressure: "",
        wind: ""}
        }

        onInputChange = (event) => {
        this.setState({term: event.target.value})
        }

        onFormSubmit = (event) => {
        event.preventDefault();
        this.props.onFormSubmit(this.state.term);
        console.log(this.state.term);
        fetch(`${api.base}weather?q=${this.state.term}&units=metric&appid=${api.key}&lang=pl`)
        .then(res => res.json())
        .then(data => this.setState({
            city: data.name, 
            date: dateBuilder(new Date()),
            wind: "Siła wiatru: "+ Math.round ((data.wind.speed)*3.6) + " km/h", 
            temp: "Temperatura: " + Math.round(data.main.temp) + "°C", 
            humidity: "Wilgotność: " + data.main.humidity + " %",
            pressure: "Ciśnienie: " + data.main.pressure + " hPa",
            maxtemp: "Maksymalna: " +Math.round(data.main.temp_max) + "°C", 
            mintemp: "Minimalna: " + Math.round(data.main.temp_min)+ "°C", 
            feelslike: "Odczuwalna: "+ Math.round(data.main.feels_like) + "°C"
        }))
        .catch(error => alert("Wpisz poprawną nazwę miejscowości")) 
        };
   

    render() {
        return (
        <div>

            <div>
            <form className="searchbox" onSubmit={this.onFormSubmit}>
            <div className="ui large icon input input-group-text">
            <input type="text" 
             placeholder="Wpisz miasto"
            onChange= {this.onInputChange}
            value= {this.state.term}/>
            <i class="search icon"></i>
            </div>
            </form>
            </div>


            <div className= "container">
            
                <div className="result">

                    <div>
                    <i className="building icon huge"></i>
                    <h1 className="city">{this.state.city}</h1>
                    </div>
                    <br></br>
                    <div>
                    <i className="calendar alternate icon huge"></i>
                    <h2>{this.state.date}</h2>
                    </div>
                    <br></br>
                    <div>
                    <i className="thermometer half icon huge"></i>
                    <h2> {this.state.temp}</h2>
                    </div>
                    <br></br>
                    <div>
                    <h3> {this.state.feelslike} </h3>
                    <p> {this.state.maxtemp}</p>
                    <p> {this.state.mintemp}</p>
                    </div>

                </div>

                <div className="result">

                    <div>
                    <i className="tachometer alternate icon huge"></i>
                    <h3> {this.state.pressure}</h3>
                    </div>
                    <br></br>
                    <div>
                    <i className="tint icon huge"></i>
                    <h3> {this.state.humidity}</h3>
                    </div>
                    <br></br>
                    <div>
                    <i className="flag checkered icon huge"></i>
                    <h3>{this.state.wind} </h3>
                    <br></br>
                    </div>

                </div>
            </div>
          
            
        </div>)  
    }
}


export default Weather;