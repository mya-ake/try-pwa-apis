import Vue from "vue";
import Axios from "./plugins/axios";

const headers = {};
if (process.env.API_KEY) {
  headers["x-api-key"] = process.env.API_KEY;
}

Vue.use(Axios, {
  baseURL: process.env.API_URL || "http://localhost:3000",
  headers
});
