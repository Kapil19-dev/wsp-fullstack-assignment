import { useEffect, useState } from "react";

import {
  getProjects,
  createProject,
} from "../services/projectService";

import {
  createKPI,
  getKPISummary,
} from "../services/kpiService";

function Dashboard() {

  const [projects, setProjects] = useState([]);

  const [projectSummaries, setProjectSummaries] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    owner: "",
  });

  const [kpiData, setKpiData] = useState({
    project: "",
    name: "",
    target_value: "",
    actual_value: "",
    status: "ON_TRACK",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {

    try {

      const data = await getProjects();

      setProjects(data);

      fetchAllSummaries(data);

    } catch (error) {

      console.error(error);

    }
  };

  const fetchAllSummaries = async (projectList) => {

    const summaryMap = {};

    for (const project of projectList) {

      try {

        const summary = await getKPISummary(project.id);

        summaryMap[project.id] = summary;

      } catch (error) {

        console.error(error);

      }
    }

    setProjectSummaries(summaryMap);
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await createProject(formData);

      setFormData({
        name: "",
        description: "",
        owner: "",
      });

      fetchProjects();

    } catch (error) {

      console.error(error);

    }
  };

  const handleKPIChange = (e) => {

    setKpiData({
      ...kpiData,
      [e.target.name]: e.target.value,
    });
  };

  const handleKPISubmit = async (e) => {

    e.preventDefault();

    try {

      await createKPI(kpiData);

      alert("KPI Created Successfully");

      setKpiData({
        project: "",
        name: "",
        target_value: "",
        actual_value: "",
        status: "ON_TRACK",
      });

      fetchProjects();

    } catch (error) {

      console.error(error);

    }
  };

  return (

    <div className="p-10 bg-gray-100 min-h-screen">

      <h1 className="text-5xl font-bold mb-10 text-blue-600">
        WSP Project Dashboard
      </h1>

      {/* CREATE PROJECT */}

      <div className="bg-white p-6 rounded-lg shadow mb-10">

        <h2 className="text-2xl font-bold mb-5">
          Create Project
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Project Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <input
            type="text"
            name="owner"
            placeholder="Owner"
            value={formData.owner}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded"
          >
            Create Project
          </button>

        </form>

      </div>

      {/* CREATE KPI */}

      <div className="bg-white p-6 rounded-lg shadow mb-10">

        <h2 className="text-2xl font-bold mb-5">
          Create KPI
        </h2>

        <form
          onSubmit={handleKPISubmit}
          className="flex flex-col gap-4"
        >

          <select
            name="project"
            value={kpiData.project}
            onChange={handleKPIChange}
            className="border p-3 rounded"
            required
          >

            <option value="">
              Select Project
            </option>

            {projects.map((project) => (

              <option
                key={project.id}
                value={project.id}
              >
                {project.name}
              </option>

            ))}

          </select>

          <input
            type="text"
            name="name"
            placeholder="KPI Name"
            value={kpiData.name}
            onChange={handleKPIChange}
            className="border p-3 rounded"
            required
          />

          <input
            type="number"
            name="target_value"
            placeholder="Target Value"
            value={kpiData.target_value}
            onChange={handleKPIChange}
            className="border p-3 rounded"
            required
          />

          <input
            type="number"
            name="actual_value"
            placeholder="Actual Value"
            value={kpiData.actual_value}
            onChange={handleKPIChange}
            className="border p-3 rounded"
            required
          />

          <select
            name="status"
            value={kpiData.status}
            onChange={handleKPIChange}
            className="border p-3 rounded"
          >

            <option value="ON_TRACK">
              ON_TRACK
            </option>

            <option value="AT_RISK">
              AT_RISK
            </option>

            <option value="OFF_TRACK">
              OFF_TRACK
            </option>

          </select>

          <button
            type="submit"
            className="bg-green-600 text-white p-3 rounded"
          >
            Create KPI
          </button>

        </form>

      </div>

      {/* PROJECTS */}

      {projects.length === 0 ? (

        <div className="bg-white p-10 rounded-lg shadow text-center">

          <h2 className="text-2xl font-bold text-gray-700">
            No Projects Found
          </h2>

        </div>

      ) : (

        <div className="grid grid-cols-3 gap-5">

          {projects.map((project) => {

            const summary = projectSummaries[project.id];

            return (

              <div
                key={project.id}
                className="bg-white rounded-lg shadow p-5"
              >

                <h2 className="text-2xl font-bold">
                  {project.name}
                </h2>

                <p className="mt-3">
                  {project.description}
                </p>

                <p className="mt-4 text-gray-500">
                  Owner: {project.owner}
                </p>

                {/* KPI SUMMARY */}

                {summary && (

                  <div className="mt-5 border-t pt-4">

                    <h3 className="font-bold text-lg mb-3">
                      KPI Summary
                    </h3>

                    <p>
                      Total KPIs: {summary.total_kpis}
                    </p>

                    <p>
                      On Track: {summary.on_track}
                    </p>

                    <p>
                      At Risk: {summary.at_risk}
                    </p>

                    <p>
                      Off Track: {summary.off_track}
                    </p>

                    <p className="mt-2 font-bold">

                      Overall Status:
                      <span className="ml-2 text-blue-600">
                        {summary.overall_status}
                      </span>

                    </p>

                  </div>

                )}

              </div>

            );
          })}

        </div>

      )}

    </div>
  );
}

export default Dashboard;