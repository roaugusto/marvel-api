import React, { Component } from 'react';
import { connect } from 'react-redux'

import { getCharacters } from '../../store/actions/marvel'
import { setKeys } from '../../store/actions/keys'

import Loader from '../../components/Loader'

import "./styles.css"

class Home extends Component {

  state = {
    public_key: '5f305f42bfce9996a79d639b4ec331f6',
    private_key: '72cd034af528721b4deae6aeb01239bec8661fe3'
  }

  handleAccess = async () => {

    const keys = {
      public_key: this.state.public_key,
      private_key: this.state.private_key
    }

    await this.props.onGetCharacters(1, keys)
    await this.props.onSetKeys(this.state.public_key, this.state.private_key)

    this.props.history.push('/characters')

  }

  hanglePublicKeyInput = e => this.setState({ public_key: e.target.value })
  hanglePrivateKeyInput = e => this.setState({ private_key: e.target.value })

  render() {
    return (
      <div className="img-background">
        <div className="box">
          <div className="title-home text-center"> Marvel API com React.js</div>

          <div className='title-desc text-center'>
            <div>Para obter sua próprias chaves, acesse: </div>            
          </div>
          <div className='title-desc2 text-center'>
            <a target="_blank"
              rel="noopener noreferrer"
              href='https://developer.marvel.com/documentation/getting_started'> https://developer.marvel.com
            </a>
          </div>

          <div className="card">
            <div className="card-header text-center">
              Dados de acesso
            </div>
            <div className="card-body">
              <label><small>Private Key</small></label>
              <input className="form-control form-control-sm input"
                value={this.state.private_key}
                onChange={(event) => this.hanglePrivateKeyInput(event)}
                placeholder="private_key" />
              <label><small>Public Key</small></label>
              <input className="form-control form-control-sm input"
                value={this.state.public_key}
                onChange={(event) => this.hanglePublicKeyInput(event)}
                placeholder="public_key" />

              <div className="text-center">
                <button type="submit"
                  onClick={this.handleAccess}
                  className="btn-access btn btn-primary btn-sm"> Acessar
              </button>
              </div>
            </div>
          </div>
        </div>
        <Loader showPopup={this.props.isLoading} />
      </div>
    )
  }
}

const mapStateToProps = ({ marvel }) => {
  return {
    characters: marvel.marvelCharacters,
    isLoading: marvel.isLoading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetCharacters: (page, keys) => dispatch(getCharacters(page, keys)),
    onSetKeys: (public_key, private_key) => dispatch(setKeys(public_key, private_key))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)