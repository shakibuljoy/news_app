import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import Loading from './Loading';

export class News extends Component {
    static defaultProps = {
        country:null,
        category: 'general',
        pageSize: 12,
        q: null
    }
    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
        q: PropTypes.string,
        pageSize: PropTypes.number,
    }
    article = []
    constructor(){
        super();
        this.state = {
            article: this.article,
            loading: true,
            page: 1,
            totalResults: 0,
            totalPage: 0,
            message: null
        }
    }
    newsHandler = async ( page) => {
        this.setState({
            loading: true
        })
        let url = `https://newsapi.org/v2/top-headlines?language=en&pageSize=${this.props.pageSize}${this.props.country!==null?`&country=${this.props.country}`:''}${this.props.q!==null?`&q=${this.props.q}`:''}${this.props.category!==null?`&category=${this.props.category}`:''}&apiKey=${process.env.REACT_APP_NEWS_API}&page=${page}`;
        console.log(url);
        try{
            let data = await fetch(url);
            let parseData = await data.json();
            this.setState({
                loading: false
        })
        if (parseData.status === 'ok'){
            if (parseData.articles.length !== 0){
                this.setState({
                    article:parseData.articles,
                    totalResults: parseData.totalResults,
                    loading: false,
                    totalPage: Math.round(parseData.totalResults / this.props.pageSize)
                })
            }else{
                this.setState({
                    loading: false,
                    message: "No article Found"
                })
            }
            
        }else{
            this.setState({
                loading: false
            })
        }
        }catch (error){
            this.setState({
                loading: false,
                message: error
            })
        }
        
        
        
    };
    async componentDidMount(){
        console.log('page number: ', this.state.page)
        this.newsHandler(this.state.page)

    }
    handleNextClick = async () => {
        await this.setState({
            page: this.state.page + 1
        });
        this.newsHandler(this.state.page)
    };

    handlePrevClick = async () => {
       await this.setState({
            page: this.state.page -1
        })
        this.newsHandler(this.state.page)
    };
    
    render() {
        return(
        
            <div className='container mt-5'>
                <h1 className='text-center'>NEWS MONKEY - {this.props.category[0].toUpperCase() + this.props.category.slice(1, this.props.category.length)}</h1>
               {this.state.message && <h1 className='text-center mt-5'>{this.state.message}m</h1>}
               {this.state.loading && <Loading />}
                {this.state.totalResults === 0 || <h4>Page: {this.state.page} of {this.state.totalPage}</h4>}
                <div className="row">
                    {!this.state.loading && this.state.article.map((elem) => { return (
                        <div key={elem.url} className="col-md-3 my-3">
                        <NewsItem 
                        url={elem.url} title={elem.title?elem.title.slice(0, 30): "Title"} 
                        description={elem.description?elem.description.slice(0, 65):"News Desctiption"}
                        imgUrl={elem.urlToImage}
                        author={elem.source.name}
                        date={elem.publishedAt}
                         />
                        </div>
                    )
                        
                    })}
                    
                </div>
                <div className="container mt-3 d-flex justify-content-between">
                    <button onClick={this.handlePrevClick} disabled={this.state.page <= 1} className="btn btn-dark">&larr; Previous</button>
                    <button onClick={this.handleNextClick} disabled={this.state.page >= this.state.totalPage} className="btn btn-dark">Next &rarr;</button>
                </div>

                
            </div>
            
        )
    }
}
export default News