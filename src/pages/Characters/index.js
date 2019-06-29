import React, { Component } from 'react';
import { connect } from 'react-redux'
import moment from 'moment'

import Loader from '../../components/Loader'

import "./styles.css"

import { getCharacters, setCharacter } from '../../store/actions/marvel'

class Characters extends Component {

  state = {
    characters: []
  }


  componentDidMount = () => {
    this.setState({ characters: this.props.characters })
    //console.log('marvel', this.props.characters.data.results)
  }

  handleFirst = async () => {
    await this.props.onGetCharacters(1, this.props.keys)
    this.setState({ characters: this.props.characters })
  }

  handlePrev = async () => {
    let prevPage = this.props.page - 1
    prevPage = prevPage < 1 ? 1 : prevPage
    await this.props.onGetCharacters(prevPage, this.props.keys)
    this.setState({ characters: this.props.characters })
  }


  handleNext = async () => {
    const nextPage = this.props.page + 1
    await this.props.onGetCharacters(nextPage, this.props.keys)
    this.setState({ characters: this.props.characters })
  }

  handleLast = async () => {

    if (typeof this.props.characters.data !== 'undefined') {
      const total = this.props.characters.data.total
      const lastPage = Math.floor(total / 10)
      await this.props.onGetCharacters(lastPage, this.props.keys)
      this.setState({ characters: this.props.characters })
    }

  }

  handleDetail = async (item) => {

    //console.log('item', item)
    await this.props.onSetCharacter(item)
    this.props.history.push('/details')
  }

  render() {

    let characters = this.props.characters.data

    return (
      <div className="img-background">
        <div className="content">

          <div className="title text-center">Personagens Marvel</div>

          <div className="custom-table">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th style={{ width: 200 }} scope="col"><small>Nome</small></th>
                  <th style={{ width: 400 }} scope="col"><small>Descrição</small></th>
                  <th style={{ width: 100 }} scope="col" className="text-center"><small>Última atualização</small></th>
                </tr>
              </thead>

              <tbody className="table-body" style={{ backgroundColor: "white" }}>
                {
                  typeof characters !== 'undefined' ?
                    characters.results.map((item, index) => {
                      return (
                        <tr key={index} onClick={() => this.handleDetail(item)}>
                          <td><small>{item.name}</small></td>
                          <td><small>{item.description}</small></td>
                          <td className="text-center"><small>{moment(item.modified).format('DD-MM-YYYY')}</small></td>
                        </tr>
                      )
                    })
                    :
                    null
                }

              </tbody>

            </table>


          </div>

          <div className="pagination">
            <button type="submit" onClick={this.handleFirst}
              className="btn btn-primary btn-sm"> Primeira </button>
            <button type="submit" onClick={this.handlePrev}
              className="btn btn-primary btn-sm"> Anterior </button>
            <button type="submit" onClick={this.handleNext}
              className="btn btn-primary btn-sm"> Próxima </button>
            <button type="submit" onClick={this.handleLast}
              className="btn btn-primary btn-sm"> Última </button>
          </div>

        </div>
        <Loader showPopup={this.props.isLoading} />
      </div>
    )
  }
}

const mapStateToProps = ({ keys, marvel }) => {
  return {
    keys: keys.keys,
    characters: marvel.marvelCharacters,
    page: marvel.page,
    isLoading: marvel.isLoading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetCharacters: (page, keys) => dispatch(getCharacters(page, keys)),
    onSetCharacter: currentCharacter => dispatch(setCharacter(currentCharacter)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Characters)