import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiDownload } from 'react-icons/fi';

import './styles.css';

interface Props {
  onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
  const [selectedFileURL, setSelectedFileURL] = useState("");

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0]

    const fileUrl = URL.createObjectURL(file);

    setSelectedFileURL(fileUrl);
    onFileUploaded(file);
  }, [onFileUploaded])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept='image/*' />
      {
        selectedFileURL ?
        <img src={selectedFileURL} alt="Imagem selecionada"/> : (
          isDragActive ?
          <p>
            <FiDownload />
            Arraste a imagem para cá
          </p> :
          <p>
            <FiUpload />
            Imagem do estabelecimento
            </p>
        )
      }
    </div>
  )
}

export default Dropzone;
