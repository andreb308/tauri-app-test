import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { Button } from "./components/ui/button";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type PetAPIResponse = {
  id: string;
  url: string;
  width: number;
  height: number;
}[];

function App() {
  const [data, setData] = useState<PetAPIResponse>([]);
  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    invoke("my_custom_command", { invokeMessage: "Hello!" });
  }

  useEffect(() => {
    fetchPuppies("cat");
    greet();
  }, []);

  const fetchPuppies = async (pet: "dog" | "cat") => {
    setData([]);
    const pets: PetAPIResponse = await fetch(
      `https://api.the${pet}api.com/v1/images/search?limit=10`
    ).then((res) => res.json());
    setData(pets);
    console.log(pets[0].url);
  };

  return (
    <div className="flex flex-col items-center justify-center m-0 h-dvh w-dvw text-center bg-gray-600">
      <h1 className="text-6xl m-0 text-white">Test</h1>{" "}
      <Carousel
        opts={{
          duration: 20,
          // loop: true,
        }}
        className="w-full max-w-[80%]"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {data &&
            data.map((pet, index) => (
              <CarouselItem className=" max-w-3xl pl-2 md:pl-4 " key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex items-center justify-center p-6 bg-gray-500">
                      <img
                        style={{
                          width: 500,
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
      <div className="flex items-center justify-between w-[25%] flex-row mt-10">
        <Button className="w-48" onClick={() => fetchPuppies("dog")}>
          Fetch New Dogs
        </Button>

        <Button className="w-48" onClick={() => fetchPuppies("cat")}>
          Fetch New Cats
        </Button>
      </div>
    </div>
  );
}

export default App;
