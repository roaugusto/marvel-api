import React, { Component } from 'react';

import './styles.css'

class Loader extends Component {

  render() {
    return (
      <div>
        {
          this.props.showPopup ?
            <div className='popup' >
              <div className='popup_inner'>
                <img src={require('./loader.gif')} alt='spinner' width={50} />
              </div>
            </div>
            : null
        }
      </div>
    )
  }
}

export default Loader