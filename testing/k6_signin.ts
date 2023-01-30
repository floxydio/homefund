import http, { head } from "k6/http";
import { check, sleep } from "k6";

export const options = {

   vus: 10,
   duration: '30s',
}

export default function () {
   const payload = JSON.stringify({
      username: 'flox',
      password: '1234',
   });
   const headers = {
      "Content-Type": "application/json"
   }
   let res = http.post("http://127.0.0.1:3500/api/sign-in", payload, { headers })
   check(res, { "status was 200": (r) => r.status == 200 });
   sleep(1);
}
