import React, { useEffect, useRef, useState } from "react";
import TopNav from "/src/components/TopNav";
import SideNav from "/src/components/SideNav";
import {Link} from "react-router-dom"; 
import { useParams } from "react-router-dom"; 

export default function home() {
  
  const [articleUrl, setArticleUrl] = useState(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    const articles = [
      "https://xkcd.com/323/",
      "https://blog.chromium.org/2024/06/building-faster-smarter-chromebook.html",
      "https://engineering.fb.com/2024/06/12/data-infrastructure/training-large-language-models-at-scale-meta/",
      "https://ieftimov.com/posts/deep-dive-cors-history-how-it-works-best-practices/",
      "https://www.devbeat.co.uk/blog/how_to_not_make_things_worse"
    ];
    const randomIndex = Math.floor(Math.random() * articles.length);
    setArticleUrl(articles[randomIndex]);
  }, []);

  function zoomIn(){
    if (iframeRef.current) {
      iframeRef.current.style.transform = "scale(1.2)";
    }
  }

  function zoomOut(){
    if (iframeRef.current){
      iframeRef.current.style.transform = "scale(0.8)";
    }
  }

  return (
    <div className="content home-page">
      <div className="top-text" >  
        <h4>Welcome to <span style={{fontWeight: 'bold'}} >The Confused Coder,</span> your customizable repository for coding resources! </h4>
        <p>Here you can find current tech articles, view resources for the world's most popular programming languages, or <span><Link to='/register'>create an account </Link></span>to upload and store all of your personal resources in one place! Happy Coding!</p>
      </div>
      <div className="iframe-container">
        <iframe ref={iframeRef} src={articleUrl} frameborder="0"></iframe>
      </div>
      <div className="zoom-controls" >
        <button onClick={zoomIn} >zoom in</button>
        <button onClick={zoomOut} >zoom out</button>
      </div>
      <div className="bottom-text" >
        <p>Thanks for stopping by!</p>
      </div>



    </div>
    

  );
};
