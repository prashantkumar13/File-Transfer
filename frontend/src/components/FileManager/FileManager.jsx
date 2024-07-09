"use client"
import React, { useEffect, useState } from "react";
import FileIcon from "./FileIcon";
import { useUser } from '@/context/UserContext';
import { baseUrl } from "@/context/baseUrl";


const MyFiles = () => {
  const { user } = useUser()
  const [myFiles, setMyFiles] = useState([]);
  const [error, setError] = useState(null);

  const getFileExtension = (filename) => {
    const parts = filename.split('.');
    return parts.length > 1 ? parts.pop() : '';
  };
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return date.toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const fetchMyFiles = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/v1/file/files/${user.id}`);
        if (!response.ok) {
          throw new Error(`Sorry ${user.username} Failed to fetch files or You don't have files`);
        }
        const data = await response.json();
        setMyFiles(data.files); // Assuming the API returns an object with a 'files' array
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMyFiles();

  }, []);
  console.log(myFiles)

  return (
    <div className="container mx-auto py-8">
      <div className="row">
        <div className="col-12">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-lg font-semibold">My Files</h4>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {/* {files.map((file, index) => (
                <FileIcon key={index} name={file.name} size={file.size} icon={file.icon} />
              ))} */}
              {myFiles.map((fileGroup, index) => {
                if (fileGroup.quantity > 1) {
                  return (
                    <FileIcon
                      key={Math.random()}
                      name={fileGroup.title}
                      size={fileGroup.totalSize}
                      createdAt={formatDateTime(fileGroup.createdAt)}
                      icon={"file"}
                    />
                  );
                } else {
                  return (
                    <FileIcon
                      key={Math.random()}
                      name={fileGroup.files[0].filename}
                      size={fileGroup.files[0].size}
                      createdAt={formatDateTime(fileGroup.createdAt)}
                      icon={getFileExtension(fileGroup.files[0].filename)}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



const files = [
  { name: "invoice_project.pdf", size: "568.8 kb", icon: "pdf" },
  { name: "Bmpfile.bmp", size: "845.8 mb", icon: "bmp" },
  { name: "Photoshop_file.ps", size: "684.8 kb", icon: "psd" },
  { name: "Avifile.avi", size: "5.9 mb", icon: "avi" },
  { name: "Cadfile.cad", size: "95.8 mb", icon: "cad" },
  { name: "Mytextfile.txt", size: "568.8 kb", icon: "txt" },
  { name: "Epsfile.eps", size: "568.8 kb", icon: "eps" },
  { name: "Project_file.dll", size: "684.3 kb", icon: "dll" },
  { name: "Website_file.sql", size: "457.8 kb", icon: "sql" },
  { name: "invoice_project.pdf", size: "568.8 kb", icon: "zip" },
  { name: "invoice_project.pdf", size: "568.8 kb", icon: "ps" },
  { name: "invoice_project.pdf", size: "568.8 kb", icon: "png" },
];

export default MyFiles;
