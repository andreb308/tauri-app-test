import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

type CatAPIResponse = {
  id: string;
  url: string;
  width: number;
  height: number;
}[];

function App() {
  // const [greetMsg, setGreetMsg] = useState("");
  const [imageURL, setImageURL] = useState(
    "https://cdn2.thecatapi.com/images/4q6.gif"
  );

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  const fetchCat = async () => {
    const api_url = "https://api.thecatapi.com/v1/images/search";
    const cat: CatAPIResponse = await fetch(
      "https://api.thecatapi.com/v1/images/search"
    ).then((res) => res.json());
    setImageURL(cat[0].url);
    console.log(cat[0].url);
  };

  return (
    <div className="container">
      <img
        style={{ width: 750, height: 500, objectFit: "contain" }}
        src={imageURL}
        alt=""
      />

      <button onClick={() => fetchCat()}>Fetch New Cat</button>
    </div>
  );
}

export default App;
