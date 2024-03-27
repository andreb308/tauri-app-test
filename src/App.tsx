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
    <div className="flex flex-col items-center justify-center m-0 h-dvh w-dvw text-center bg-[#0f0e17]">
      <div className=" z-[-100] absolute top-0 bottom-0 size-full border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start">
        <EvervaultCard text={""} />
      </div>
      <div className="z-1 max-w-full flex items-center justify-center flex-col">
        <h1 className="font-raleway font-bold text-6xl m-0 text-white mb-12 font-">
          Título
        </h1>{" "}
        <Carousel
          opts={{
            duration: 20,
            loop: true,
          }}
          className="w-full max-w-[80%]"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {data &&
              data.map((pet, index) => (
                <CarouselItem className=" max-w-3xl " key={index}>
                  <div className=" p-0 size-full">
                    <Card>
                      <CardContent className="h-[65dvh] flex items-center justify-center bg-[#16161a]">
                        <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start w-full relative h-full">
                          <EvervaultCard
                            text={
                              <img
                                className="w-[80%] h-[75dvh] object-contain rounded-lg"
                                src={pet.url}
                                alt=""
                              />
                            }
                          />
                        </div>
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
          <Button
            className="w-48 bg-[#7f5af0]"
            onClick={() => fetchPuppies("dog")}
          >
            Fetch New Dogs
          </Button>

          <Button
            variant={"destructive"}
            className="w-48 bg-[#7f5af0]"
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
