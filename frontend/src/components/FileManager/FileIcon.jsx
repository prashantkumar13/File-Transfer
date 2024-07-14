import { baseUrl } from '@/context/baseUrl';
import React from 'react'

const FileIcon = ({ name, icon, size, createdAt,id }) => {

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://mega-share.vercel.app/download/${id}`).then(() => {
      alert('Link copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  const handleClick =()=>{
    copyToClipboard()

  }

  return (
    <div
      className="bg-gray-100 p-4 rounded-lg relative group"
    >
      <button className="absolute top-2 right-2 text-gray-500 hover:text-red-600" onClick={handleClick}>
        <img className='h-5 w-5' src={"https://img.icons8.com/?size=50&id=7867&format=png"} />

      </button>
      <div className="flex justify-center mb-2">
        {(icon === "file") ? (<img
          src={`https://upload.wikimedia.org/wikipedia/commons/a/a1/Icons8_flat_folder.svg`}
          alt={`file icon`}
          className="w-16 h-16"
        />) : (<img
          src={`https://coderthemes.com/highdmin/layouts/assets/images/file_icons/${icon}.svg`}
          alt={`${icon} icon`}
          className="w-16 h-16"
        />)}
      </div>
      <button className="absolute bottom-2 right-2 text-gray-500 hover:text-blue-600">


      </button>
      <div className="text-center">
        <h5 className="text-sm font-semibold truncate">
          {name}
        </h5>
        <p className="text-xs text-gray-500">{createdAt}</p>
        <p className="text-xs text-gray-500">{size}</p>
      </div>
    </div>
  )
}

export default FileIcon