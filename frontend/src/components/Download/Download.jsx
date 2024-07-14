"use client"
import React, { useEffect, useState } from "react";
import { useParams } from 'next/navigation'
import FileIcon from "./FileIcon";
import { useUser } from '@/context/UserContext';
import { baseUrl } from '@/context/baseUrl';

const MyFiles = () => {
  const { user } = useUser();
  const [myFiles, setMyFiles] = useState([]);
  const [error, setError] = useState(null);
  const {slug} =useParams()
  console.log("paran",slug)

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

  const handleDownload = (url, filename) => {
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => console.error('Error downloading the file', error));
  };

  useEffect(() => {
    const fetchMyFiles = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/v1/file/file/${slug}`);
        if (!response.ok) {
          throw new Error(`Sorry ${user.username}, failed to fetch files or you don't have files.`);
        }
        const data = await response.json();
        console.log("inside my download", data);
        setMyFiles(data.file); // Assuming the API returns an object with a 'files' array
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMyFiles();
  }, [user.username]);

  return (
    <div className="container mx-auto py-8">
      <div className="row">
        <div className="col-12">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-lg font-semibold">{ `${myFiles.title? myFiles.title: "untitled" }(${myFiles.quantity})`}</h4>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {myFiles?.files?.map((fileData) => (
                <div key={fileData._id} className="file-icon">
                  <FileIcon
                    name={fileData.filename}
                    size={fileData.size}
                    createdAt={""}
                    icon={getFileExtension(fileData.filename)}
                  />
                  <button
                    onClick={() => handleDownload(fileData.fileUrl, fileData.filename)}
                    className="mt-2 text-blue-500 hover:underline"
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFiles;
