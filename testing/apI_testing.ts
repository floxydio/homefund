import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
   thresholds: {
      http_req_duration: ["p(99) < 3000"],
   },
   vus: 10,
   duration: '30s',
};

export default function () {
   let res = http.get("https://jsonplaceholder.typicode.com/todos");
   check(res, { "status was 200": (r) => r.status == 200 });
   sleep(1);
}
