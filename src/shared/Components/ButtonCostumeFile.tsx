import React, { ChangeEvent, useRef } from 'react';

interface ContainerProps {
  text: string;
  className: string;
  type: "directory" | "group-file" | "file"
  onChange: (value: Array<File>) => any;
}

// Sobretipar para la lectura de una carpeta
declare module "react" {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    webkitdirectory?: string;
  }
}

const propsInput = {
  directory: { webkitdirectory: "" },
  "group-file": { multiple: true },
  file: {  }
}

export const ButtonCostumeFile = (props: ContainerProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
      fileInputRef.current?.click();
    };
  
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files || files.length === 0) {
        return;
      }
  
      const extensionesPermitidas = /(\.xml|\.json|\.aca|\.cab|\.ley|\.tri)$/i;
      const payload = Array.from(files);
      
      for (let row of payload) {
        if(!extensionesPermitidas.exec(row.name)) {
          alert('Por favor sube un archivo con alguna de estas extensiones: .xml, .json, .aca, .cab, .ley, .tri.');
          return;
        }
      }
  
      props.onChange(payload);
    };

    return (
        <>
            <button onClick={handleButtonClick} className={props.className}>{props.text}</button>
            <input
              { ...propsInput[props.type] }
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
              accept=".xml, .json, .aca, .cab, .ley, .tri"
            />
        </>
    )
}