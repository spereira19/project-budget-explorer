import React, { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
//import { useTranslation } from 'react-i18next';
import Alert from "../Alerts/Alert";
import { listProjects , deleteProject } from "../../reactquery/projects/projectQueries";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";

const ListProject = () => {
  //const { t } = useTranslation(); 

  const { data, isError, isLoading, isFetched, error, refetch } = useQuery({
    queryFn: listProjects,
    queryKey: ["list-projects"],
  });
  
  console.log(data);

  const {
    mutateAsync,
    isPending,
    error: categoryErr,
    isSuccess,
  } = useMutation({
    mutationFn: deleteProject,
    mutationKey: ["delete-project"],
  });

 //Delete handler
 const handleDelete = (id) => {
  mutateAsync(id)
    .then((data) => {
      //refetch
      refetch();
    })
    .catch((e) => console.log(e));
  };  

  return (
    <div className="max-w-md mx-auto my-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Projects</h2>
      {/* Display message */}
      {isLoading && <Alert type="loading" message="Loading" />}
      {isError && (
        <Alert type="error" message={error.response.data.message} />
      )}
      <ul className="space-y-4">
        {data?.map((project) => (
          <li
            key={project?._id}
            className="flex justify-between items-center bg-gray-50 p-3 rounded-md"
          >
            <div>
              <span className="text-gray-800">{project?.name}</span>
             
            </div>
            <div className="flex space-x-3">
            <Link to={`/updateProjects/${project._id}`}>
                <button className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
              </Link>
              <button
                onClick={() => handleDelete(project?._id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ListProject;