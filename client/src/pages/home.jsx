import React, { useRef } from "react";
import TopNav from "/src/components/TopNav";
import SideNav from "/src/components/SideNav";
import {Link} from "react-router-dom"; 
import { useParams } from "react-router-dom"; 

export default function home() {
  
  const iframeRef = useRef(null);

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
        <p>Welcome to The Confused Coder, your cusomizeable repository for coding resources! </p>
      </div>
      <div className="iframe-container">
        <iframe ref={iframeRef} src="https://xkcd.com/323/" frameborder="0"></iframe>
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
