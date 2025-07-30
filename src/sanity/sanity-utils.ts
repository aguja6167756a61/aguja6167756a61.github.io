import client from "./client";
import type { Image } from "../types/Image";

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
