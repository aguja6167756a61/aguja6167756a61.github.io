import client from "./client";
import type { Image } from "../types/Image";
import type { Fecha } from "../types/Fecha";

export async function getImages(): Promise<Image[]> {
  return client.fetch(`*[_type == "imagePost"] {
    _id, 
    file{
      asset->{
        _id,
        url
      },
    },
  }`);
}

export async function getFechas(): Promise<Fecha[]> {
  return client.fetch(`*[_type == "fechasAguja"] | order(date desc) {
    _id, 
    date,
    name, 
    place,
    time,
    info,
    link
  }`);
}
