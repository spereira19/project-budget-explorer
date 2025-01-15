import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { listTransactions } from "../../reactquery/transactions/transactionQueries";
import Alert from "../Alerts/Alert";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { listProjects } from "../../reactquery/projects/projectQueries";

ChartJS.register(ArcElement, Tooltip, Legend);

const ListTransaction = () => {

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    project: "",
  });
  //!Handle Filter Change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    console.log([name])
  };

    //fetching
    const {
      data: project,
      isLoading: projectLoading,
      error: projectErr,
    } = useQuery({
      queryFn: listProjects,
      queryKey: ["list-projects"],
    });

  const {
    data: transactions,
    isError,
    isLoading,
    isFetched,
    error,
    refetch,
  } = useQuery({
    queryFn: () => listTransactions(filters),
    queryKey: ["list-transactions", filters],
  });

  console.log('Current Filters:', filters);
  console.log(transactions)

  const totals = transactions?.reduce(
    (acc, transaction) => {
      if (transaction?.type === "budget") {
        acc.budget += transaction?.amount;
      } else {
        acc.expense += transaction?.amount;
      }
      return acc;
    },
    { budget: 0, expense: 0 }
  );
  console.log(totals?.budget)
  //! Data structure for the chart

  //! Data structure for the chart
  const chartData = {
    labels: ["Additional Budget received", "Expense"],
    datasets: [
      {
        label: "Transactions",
        data: [totals?.budget, totals?.expense],
        backgroundColor: ["#36A2EB", "#FF6384"],
        borderColor: ["#36A2EB", "#FF6384"],
        borderWith: 1,
        hoverOffset: 4,
      },
    ],
  };
  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 25,
          boxWidth: 12,
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Budget v/s Expense",
        font: {
          size: 18,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
    cutout: "70%",
  };
return (
  <div className="my-8 p-6 bg-white rounded-lg shadow-xl border border-gray-200">
  <h1 className="text-2xl font-bold text-center mb-6">
    Transaction Overview
  </h1>
  <div style={{ height: "500px" }}>
    <Doughnut data={chartData} options={chartOptions} />
  </div>


  <div className="my-8 p-6 bg-white rounded-lg shadow-xl border border-gray-200">
  <div className="my-4 p-4 shadow-lg rounded-lg bg-white">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <select
          name="project"
          value={filters.project}
          onChange={handleFilterChange}
          className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          <option value="">Select project</option>
          {project?.map((project) => {
            return (
              <option key={project?._id} value={project?._id}>
                {project?.name}
              </option>
            );
          })}
      </select>

      {/* Start Date */}
      <input
        type="date"
        name="startDate"
        value={filters.startDate}
        onChange={handleFilterChange}
        className="p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
      />
      {/* End Date */}
      <input
        value={filters.endDate}
        onChange={handleFilterChange}
        type="date"
        name="endDate"
        className="p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />


        </div>
        <div className="my-4 p-4 shadow-lg rounded-lg bg-white">
        </div>

        {/* Inputs and selects for filtering (unchanged) */}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Transactions
          </h3>
          {/* Display message */}
          {isError && (
            <Alert type="error" message={error.response.data.message} />
          )}
          <ul className="list-disc pl-5 space-y-2">
            {transactions?.map((transaction) => (
              <li
                key={transaction._id}
                className="bg-white p-3 rounded-md shadow border border-gray-200 flex justify-between items-center"
              >
                <div>
                  <span className="font-medium text-gray-600">
                    {new Date(transaction.date).toLocaleDateString()}
                  </span>
                  <span
                    className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.type === "budget"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {transaction.type.charAt(0).toUpperCase() +
                      transaction.type.slice(1)}
                  </span>
                  <span className="ml-2 text-gray-800">
                    {transaction.category} - €
                    {transaction.amount.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-600 italic ml-2">
                    {transaction.description}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        </div>
        
        <div className="my-8 p-6 bg-white rounded-lg shadow-xl border border-gray-200">
        </div>

        </div>
        </div>

      );
    };
    
export default ListTransaction;