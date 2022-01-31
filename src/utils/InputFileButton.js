import { useState } from 'react'
import {  MdCheckCircle } from 'react-icons/md';
import { Helper } from './Helper';

function InputFileButton({onChange, name, value, accept = "*", className = "", src = "", label = "Choose", showPath = true, showStatus = true}) {

    const [file, setFile] = useState("");

    return (
        <div className={"jpc input-file-button " + className}>
            <input type="file" name={name || "file"} value={value || file} accept={accept} id="file" onChange={(e) => {setFile(e.target.value); onChange(e); }} />
            <label htmlFor="file" >{src} {label} </label>
            {
                file !== "" && file !== undefined && showStatus? <MdCheckCircle color="green" />  : null
            }
            <span>{showPath? Helper.extractString(file, 12, file.length-1) : null}</span>
        </div>
    )
}

export default InputFileButton;