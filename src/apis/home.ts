import request from "@/utils/http";

export interface BannerItem {
  id: string;
  imgUrl: string;
  hrefUrl: string;
  type: string;
}


export interface BannerResponse {
  code: string;
  msg: string;
  result: BannerItem[];
}

export  function getBannerAPT(): Promise<BannerResponse> {
  return request({
    url: "/home/banner",
  });
}