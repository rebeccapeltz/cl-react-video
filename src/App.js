import React, { useState } from "react";
import "./styles.css";

import CldVideo from "./Video";

export default function App(props) {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Hello Cloudinary CodeSandbox React and Video Player</h1>
      <CldVideo
        id="react-video-player"
        preload="metadata"
        publicId="video/becky-sledding"
        tabindex="-1" 
      />
      <h2>Start editing to see some magic happen!</h2>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
