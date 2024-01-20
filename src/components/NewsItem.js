import React from 'react'

export default function NewsItem(props) {
  
  let { title, description, url, imgUrl, author, date} = props;
  let published = date.slice(8,10)+'-'+ date.slice(5,7)+'-'+date.slice(0, 4)
  return (
    <div className="card">
        <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-warning">{author}</span>
        <img style={{height: '210px'}} src={imgUrl?imgUrl:"https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text" style={{height: '70px'}}>
            {description}...
          </p>
          <p className="card-text"><small className="text-muted">Published at <strong>{date?published:""}</strong></small></p>
          
          <a href={url} target='_blank' rel="noreferrer" className="btn btn-sm btn-primary">Read More...</a>
        </div>
      </div>
      
  )
}

