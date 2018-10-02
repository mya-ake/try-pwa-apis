import Vue from "vue";
import Axios from "./plugins/axios";

Vue.use(Axios, {
  baseURL: process.env.API_URL || "http://localhost:3000"
});
