import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/articles",
});

export const scrapeArticles = async () => {
  const res = await api.post("/scrape/beyondchats");
  return res.data;
};

export const getArticles = async () => {
  const res = await api.get("/");
  console.log("API getArticles response:", res);
  return res.data;
};

export const rewriteArticle = async (id) => {
  const res = await api.post(`/rewrite/${id}`);
  return res.data;
};
