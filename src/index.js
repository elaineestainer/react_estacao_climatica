import 'bootstrap/dist/css/bootstrap.css'
import ReactDOM from 'react-dom'
import React from 'react'
import EstacaoClimatica from './EstacaoClimatica'
import Loading from './Loading'


class App extends React.Component {

    constructor (props) {
        super(props)
        // this.state = {
        //     latitude: null,
        //     longitude: null,
        //     estacao: null,
        //     data: null,
        //     icone: null,
        //     mensagemDeErro: null
        // }    
        
        console.log('construtor')
    }

    state = {
        latitude: null,
        longitude: null,
        estacao: null,
        data: null,
        icone: null,
        mensagemDeErro: null
    }

    componentDidMount(){
        console.log('componentDidMount')
    }
    
    componentDidUpdate (){
        console.log('componentDidUpdate')
    }
    
    componentWillUnmount (){
        console.log('componentWillUnmount')
    }

    obterEstacao = (data, latitude) => {
        const ano = data.getFullYear();
        const d1 = new Date(ano, 5, 21)
        const d2 = new Date(ano, 8, 22)
        const d3 = new Date(ano, 11, 22)
        const d4 = new Date(ano, 3, 21)
        const sul = latitude < 0
        if (data >= d1 && data < d2) {
            return sul ? 'Inverno' : 'Verão'
        }
        if (data >= d2 && data < d3) {
            return sul ? 'Primavera' : 'Outono'
        }
        if (data >= d3 && data < d4) {
            return sul ? 'Verão' : 'Inverno'
        }
        return sul ? 'Outono' : 'Primavera'
    }

   icones = {
    "Primavera" : "fa-seedling",
    "Verão" : "fa-unbrella-beach",
    "Outono" : "fa-tree",
    "Inverno" : "fa-snowman"
   }

   obterLocalizacao = () => {
    window.navigator.geolocation.getCurrentPosition(
        (position) => {
            let data = new Date()
            let estacao = this.obterEstacao(data, position.coords.latitude);
            let icone = this.icones[estacao]            
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                estacao: estacao,
                data: data.toLocaleTimeString(),
                icone: icone
            })
        },
        (err) => {
            console.log(err)
            this.setState({mensagemDeErro: 'Tente novamente mais tarde'})
        }
    )
   }

    render () {
        console.log("render")
        return (
            <div className='container mt-2'>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        {
                        (!this.state.latitude && !this.state.mensagemDeErro) ?
                        <Loading mensagem="Por favor, responda à solicitação de localização"/>
                        :
                        this.state.mensagemDeErro ?
                        <p className="border rounded p-2 fs-1 text-center">
                        É preciso dar permissão para acesso à localização.
                        Atualize a página e tente de novo, ajustando a configuração
                        no seu navegador.
                        </p>
                        :
                        <EstacaoClimatica 
                            icone={this.state.icone}
                            estacao={this.state.estacao}
                            latitude={this.state.latitude}
                            longitude={this.state.longitude}
                            // data={this.state.data}
                            // mensagemDeErro={this.state.mensagemDeErro}
                            obterLocalizacao={this.obterLocalizacao}
                        />
                        }
                    </div>
                </div>
                
            </div>
        )
    }   
}

ReactDOM.render(
    <App/>,
    document.querySelector('#root')
)