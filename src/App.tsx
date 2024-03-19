import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { Button } from "./components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

let variavel: number | string = "teste";

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
  const [data, setData] = useState<CatAPIResponse>([]);
  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  const fetchCat = async () => {
    setData([]);
    const cats: CatAPIResponse = await fetch(
      "https://api.thecatapi.com/v1/images/search?limit=10"
    ).then((res) => res.json());
    setData(cats);
    setImageURL(cats[0].url);
    console.log(cats[0].url);
  };

  return (
    <div className=" items-center justify-center container">
      <Carousel className="w-full max-w-3xl ">
        <CarouselContent>
          {data &&
            data.map((pet, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex items-center justify-center p-6">
                      <img
                        style={{
                          width: 1500,
                          height: 500,
                          objectFit: "contain",
                        }}
                        src={pet.url}
                        alt=""
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <Button
        style={{ width: 150 }}
        variant={"destructive"}
        onClick={() => fetchCat()}
      >
        Fetch New Cats
      </Button>
    </div>
  );
}

export default App;
