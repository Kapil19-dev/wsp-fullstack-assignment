import api from "../api/api";

export const createKPI = async (data) => {

  const response = await api.post("/kpis/", data);

  return response.data;
};

export const getKPISummary = async (projectId) => {

  const response = await api.get(
    `/projects/${projectId}/summary/`
  );

  return response.data;
};