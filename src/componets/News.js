import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends React.Component {
  static defaultProps={
    country:'in',
    category:'general',
  }
  static ropTypes={
    country:PropTypes.string,
    category:PropTypes.string,
  }
  articles=[]
  constructor(){
    super();
    this.state={
      articles:this.articles,
      loading:false,
      page:1
    }
  }
  async componentDidMount(){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=24fc2cdf42b34d54a614a786646bef98&page=1&pageSize=10`
    this.setState({loading:true})
    let data=await fetch(url);
    let parsedData=await data.json()
    this.setState({articles:parsedData.articles,
      totalResults:parsedData.totalResults,
    loading:false})
  }
  handlePreviousClick=async ()=>{
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=24fc2cdf42b34d54a614a786646bef98&page=${this.state.page - 1}&pageSize=10`;
    this.setState({loading:true})
    let data=await fetch(url);
    let parsedData=await data.json()
    
  this.setState({
    page:this.state.page - 1,
    articles:parsedData.articles,
    loading:false
  })
  }
  handleNextClick=async ()=>{
    if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/10)))
    {let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=24fc2cdf42b34d54a614a786646bef98&page=${this.state.page + 1}&pageSize=10`
    this.setState({loading:true})
    let data=await fetch(url);
    let parsedData=await data.json()
    
  this.setState({
    page:this.state.page + 1,
    articles:parsedData.articles,
    loading:false
  })
  }}
  
  render() {
    return (
      <div className="container my-5">
        <h2 className="text-center">NaradNews-Top headlines</h2>
        {this.state.loading && <Spinner/>}
       
        <div className="row">
          {!this.state.loading && this.state.articles.map((element)=>{
            return (<div className="col-md-3" key={element.url}>

            <Newsitem  title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt}/>
              </div>)
          })}
          
          
        </div>
        <div className="container d-flex justify-content-between" >
        <button disabled={this.state.page<=1} type="button" class="btn btn-outline-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/10)} type="button" class="btn btn-outline-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
