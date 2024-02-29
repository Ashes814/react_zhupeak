// request related to user
import { request } from "@/utils";
// 1. Login

export function loginApi(formData) {
  return request({
    url: "/authorizations",
    method: "POST",
    data: formData,
  });
}

export function getProfileApi() {
  return request({
    url: "/user/profile",
    method: "GET",
  });
}
