import React from 'react';
import "./styles.css"

const CardComic = (item) => (

    <div className='card-detail'>

        <div className="card">
            <div className="card-header">
                <div className="card-comic">
                    <div>
                        <b>Título: </b> {item.comic.title}
                    </div>
                    <div className="num-capa">
                        <b>Número de Capa: </b> {item.comic.issueNumber}
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="card-description">
                    <div className="thumbnail">
                        <img className="thumbnail-comic" src={item.comic.thumbnail.path + '.' + item.comic.thumbnail.extension} alt='img' />
                    </div>
                    <div><span className="thumbnail-text"> 
                    <b>Descrição</b> <p />
                     {item.comic.description}</span></div>
                </div>
            </div>
        </div>


    </div >
)

export default CardComic