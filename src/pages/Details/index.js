import React, { Component } from 'react';
import { connect } from 'react-redux'
import "./styles.css"

import { getComics } from '../../store/actions/marvel'
import CardDetail from '../../components/CardDetail'
import CardComic from '../../components/CardComic'

import imageLoader from '../../components/Loader/loader.gif'

class Details extends Component {

  state = {
    currentCharacter: [],
    comics: [],
    total: 0,
    rest: 0,
    comicsOffset: 0,
    showBtnMore: true,
  }

  componentDidMount = async () => {
    await this.setState({ currentCharacter: this.props.currentCharacter })
    await this.props.onGetComics(this.state.currentCharacter.id, this.state.comicsOffset, this.props.keys)
    //console.log('comics', this.props.comics.data.results)
    if (typeof this.props.comics.data === 'undefined') return
    
    await this.setState({ comics: this.props.comics.data.results })
    const rest = typeof this.props.comics.data !== 'undefined' ? this.props.comics.data.total - 20 : null
    //console.log('rest', rest)
    this.setState({ rest: rest, comicsOffset: 20 })

  }

  handleBack = () => {
    this.props.history.goBack()
  }

  handleLoadMore = async () => {
    //console.log('this.state.comicsOffset', this.state.comicsOffset)
    this.setState({ showBtnMore: false })
    await this.props.onGetComics(this.state.currentCharacter.id, this.state.comicsOffset, this.props.keys)
    const moreComics = this.state.comicsOffset + 20
    //console.log('moreComics', moreComics)
    await this.setState({ comicsOffset: moreComics })

    const rest = typeof this.props.comics.data !== 'undefined' ? this.props.comics.data.total - this.state.comicsOffset : null
    this.setState({ rest: rest })

    let comics = this.state.comics
    comics = comics.concat(this.props.comics.data.results)
    await this.setState({ comics: comics })

    this.setState({ showBtnMore: true })

  }

  render() {

    const thumbnail = this.state.currentCharacter.thumbnail
    const img = typeof thumbnail !== 'undefined' ? thumbnail.path + '.' + thumbnail.extension : null

    return (
      <div className="img-background">
        <div className="content">

          <div className="text-center">
            <button type="submit" onClick={this.handleBack}
              className="btn-detail btn-primary btn-sm"> Voltar </button>
          </div>

          {
            img ?
              <div>
                <div className="title-detail text-center">Detalhes</div>
                <CardDetail img={img} name={this.state.currentCharacter.name}
                  description={this.state.currentCharacter.description} />

                <div className="title-detail text-center">Fascículos</div>

                {this.state.comics ?

                  this.state.comics.map((item, index) => {
                    //console.log('comics', item)
                    return (
                      <CardComic key={index} comic={item} />
                    )
                  })
                  :

                  null

                }


              </div>
              : null
          }

          {
            this.state.rest > 0 ?

              this.state.showBtnMore ?
                <div className="text-center">
                  <button type="submit" onClick={this.handleLoadMore}
                    className="btn-load btn-primary btn-sm"> Carregar mais </button>
                </div>
                : null
              : null
          }

          {
            this.props.isLoading ?
              <div className="spinner">
                <img src={imageLoader} alt='spinner' width={50} />
              </div>
              : null
          }


        </div>


      </div>
    )
  }
}

const mapStateToProps = ({ keys, marvel }) => {
  return {
    keys: keys.keys,
    currentCharacter: marvel.currentCharacter,
    page: marvel.page,
    comics: marvel.comics,
    isLoading: marvel.isLoading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetComics: (id, offset, keys) => dispatch(getComics(id, offset, keys))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)