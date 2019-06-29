import React from 'react';
import "./styles.css"

const CardDetail = (item) => (
    <div className='card-detail'>

        <div className="card text-center">
            <div className="card-header">
                {item.name}
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-sm-4">
                        <div className="thumbnail">
                            <img className="thumbnail-img" src={item.img} alt='img' />
                        </div>
                    </div>
                    <div className="col-sm-6 description">
                        <div>
                            <div className="description">{item.description} </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
)

export default CardDetail