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

import { EvervaultCard } from "./components/ui/evervault-card";
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
    <div className="flex z-[-1] flex-col items-center justify-center m-0 h-dvh w-dvw text-center bg-[#0f0e17]">
      <div className=" z-0 absolute top-0 bottom-0 size-full border border-black/[0.2] dark:border-white/[0.2] bg-transparent flex flex-col items-start">
        <EvervaultCard className={"z-[-2]"} text={""} />
      </div>
      <div className="z-2 max-w-full flex items-center justify-center flex-col">
        <h1 className="font-raleway font-bold text-6xl m-0 z-10 text-white mb-12 select-none pointer-events-none">
          Título
        </h1>{" "}
        <Carousel
          opts={{
            duration: 20,
            loop: true,
          }}
          className="w-full max-w-[80%]  pointer-events-none"
        >
          <CarouselContent className="-ml-2 min-h-[600px]  md:-ml-4">
            {data &&
              data.map((pet, index) => (
                <CarouselItem className=" max-w-3xl " key={index}>
                  <div className=" p-0 size-full">
                    <Card>
                      <CardContent className="min-h-[600px] flex items-center justify-center bg-[#16161a59]">
                        <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-center justify-center w-full relative h-full">
                          <img
                            className="w-[500px] h-[500px] object-contain rounded-lg"
                            src={pet.url}
                            alt=""
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious className=" pointer-events-auto" />
          <CarouselNext className=" pointer-events-auto" />
        </Carousel>
        <div className="z-20 flex items-center justify-between w-[25%] flex-row mt-10 pointer-events-none">
          <Button
            variant={"ghost"}
            className="w-48 bg-[#7f5af0] pointer-events-auto text-white hover:text:black"
            onClick={() => fetchPuppies("dog")}
          >
            Fetch New Dogs
          </Button>

          <Button
            variant={"ghost"}
            className="w-48 bg-[#7f5af0] pointer-events-auto text-white hover:text:black"
            onClick={() => fetchPuppies("cat")}
          >
            Fetch New Cats
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
