import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

interface State {
  tarhelyek: Tarhely[];
  ujNev: string;
  ujMeret: number;
  ujAr: number;
  
}

interface Tarhely {
  id: number;
  nev : string;
  meret : number;
  ar : number;
}

interface TarhelyListResponse {
  tarhely: Tarhely[];
}


class App extends Component<{}, State> {

  constructor(props: {}) {
    super(props);

    this.state = {
      ujNev: '',
      ujMeret: 0,
      ujAr: 0,
      tarhelyek: [],
    }
  }


  async Tarhelybetoltes() {
    let response = await fetch('http://localhost:3000/api/tarhely');
    let data = await response.json() as TarhelyListResponse;
    this.setState({
      tarhelyek: data.tarhely,
    })
  }

  componentDidMount() {
    this.Tarhelybetoltes();
  }
  

  Felvetelkezeles =async () => {
    const { ujNev: ujNev, ujMeret: ujMeret, ujAr: ujAr } = this.state;
    if(ujNev.trim() === '' || ujMeret <=0 || ujAr <=0) {
     return;
    }

    const adat = {
      nev: ujNev,
      meret: ujMeret,
      ar: ujAr,
    };

    let response = await fetch('http://localhost:3000/api/tarhely', {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(adat),
    });

    this.setState({
      ujNev: '',
      ujMeret: 0,
      ujAr: 0,
    })

    await this.Tarhelybetoltes();

  }


  render(){
    const { ujNev: ujNev, ujMeret: ujMeret, ujAr: ujAr} = this.state;

    return <div>
      <h2>Új Tárhely hozzáadása</h2>
      Név: <input type='text' value={ujNev} onChange={e => this.setState({ujNev: e.currentTarget.value})}></input><br/>
      Méret: <input type='number' value={ujMeret} onChange={e => this.setState({ ujMeret: parseInt(e.currentTarget.value)})}></input> GB<br/>
      Ár: <input type='number' value={ujAr} onChange={e => this.setState({ ujAr: parseInt(e.currentTarget.value)})}></input> Ft<br/>
      <button onClick={this.Felvetelkezeles}>Felvétel</button>
      
      <h1>Tárhelyek:</h1>
      <ul>
        {
          this.state.tarhelyek.map(tarhely => <li>{tarhely.nev} | {tarhely.meret} GB | {tarhely.ar} Ft </li>)
        }
      </ul>

    </div>
  }
}

export default App;