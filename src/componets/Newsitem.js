import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
   let {title,description,imageUrl,newsUrl,date}=this.props;
    return (
      <div>
        <div className='my-3'>

        <div className="card" style={{width: '18rem'}}>
        <img src={imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p class="card-text"><small class="text-muted">Last updated {new Date(date).toLocaleDateString()}</small></p>
        <a rel='noreferrer' href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
        </div>
        </div>
        </div>
      </div>
    )
  }
}

export default Newsitem
