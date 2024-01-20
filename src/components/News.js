import React, {useState, useContext, useEffect} from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import { MyContext } from '../MyContext';

export default function News(props) {
    // State Management
    const [article, setArticle] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [message, setMessage] = useState(null);
    // Context
    const {setProgress} = useContext(MyContext)

    // News Updating

    const newsHandler = async ( page) => {
        setProgress(30);
            setLoading(true);
        let url = `https://newsapi.org/v2/top-headlines?language=en&pageSize=${props.pageSize}${props.country!==null?`&country=${props.country}`:''}${props.q!==null?`&q=${props.q}`:''}${props.category!==null?`&category=${props.category}`:''}&apiKey=${process.env.REACT_APP_NEWS_API}&page=${page}`;
        try{
            let data = await fetch(url);
            let parseData = await data.json();
            setProgress(100);
            setLoading(false);
        if (parseData.status === 'ok'){
            if (parseData.articles.length !== 0){
                setArticle(parseData.articles);
                setTotalResults(parseData.totalResults);
                setLoading(false);
                setTotalPage(Math.ceil(parseData.totalResults / props.pageSize));
                setHasMore((article.length+parseData.articles.length) < parseData.totalResults);
                
            }else{
                setLoading(false);
                setMessage("No article Found");
            }
            
        }else{
            setLoading(false);
        }
        }catch (error){
            setLoading(false);
            setMessage(error);
        }
        
        
        
    };
    // Fetch More Data
   const fetchMoreData = async () => {
        setLoading(false);
        setPage(page + 1);
        let apiUrl = `https://newsapi.org/v2/top-headlines?language=en&pageSize=${props.pageSize}${props.country!==null?`&country=${props.country}`:''}${props.q!==null?`&q=${props.q}`:''}${props.category!==null?`&category=${props.category}`:''}&apiKey=${process.env.REACT_APP_NEWS_API}&page=${page}`;    
        let data = await fetch(apiUrl);
        let parseData = await data.json();
        if (parseData.status==='ok'){
            if (parseData.articles.length >0){
                let newArticle = article.concat(parseData.articles)
                await setArticle(newArticle);
                await setHasMore((article.length+parseData.articles.length) < parseData.totalResults);
                
            }
        }
        
    }
    // Use Effect
    useEffect(() => {

           newsHandler(page);
           document.title = "News Monkey - "+ props.category;
           // eslint-disable-next-line 
        
    },[]);
  return (
    <div className='container mt-5'>
                <h1 className='text-center'>NEWS MONKEY - {props.category}</h1>
               {message && <h1 className='text-center mt-5'>{message}</h1>}
               {loading && <Loading />}
                {totalResults === 0 || <h4>Page: {page} of {totalPage}</h4>}
                <div className="row">
                <InfiniteScroll
                    dataLength={article.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={loading || <Loading /> }
                    style={{overflow: 'hidden' }}
                    >
                        <div className="row">
                        {article.map((elem, index) => { return (
                            <div key={index} className="col-md-3 my-3">
                            <NewsItem 
                            url={elem.url?elem.url:elem.title} title={elem.title?elem.title.slice(0, 30): "Title"} 
                            description={elem.description?elem.description.slice(0, 65):"News Desctiption"}
                            imgUrl={elem.urlToImage}
                            author={elem.source.name}
                            date={elem.publishedAt}
                            />
                            </div>
                        )
                            
                        })}
                        </div>
                        
                    </InfiniteScroll>
                    {/* {!this.state.loading && this.state.article.map((elem) => { return (
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
                        
                    })} */}
                    
                </div>
                {/* <div className="container mt-3 d-flex justify-content-between">
                    <button onClick={this.handlePrevClick} disabled={this.state.page <= 1} className="btn btn-dark">&larr; Previous</button>
                    <button onClick={this.handleNextClick} disabled={this.state.page >= this.state.totalPage} className="btn btn-dark">Next &rarr;</button>
                </div> */}

                
            </div>
  )
}
News.defaultProps = {
    pageSize: 12,
    country: null,
    category: "General",
    q: null
}