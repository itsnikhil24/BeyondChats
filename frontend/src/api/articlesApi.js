import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const scrapeArticles = async () => {
  const res = await api.post("/scrape/beyondchats");
  return res.data;
};

export const getArticles = async () => {
  const res = await api.get("/");
  return res.data;
};

export const rewriteArticle = async (id) => {
  const res = await api.post(`/rewrite/${id}`);
  return res.data;
};
