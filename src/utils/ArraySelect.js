import { useState } from 'react';
import Dropdown, { DropContentType, DropStatus, DropType } from './Dropdown';

function ArraySelect({ name, id = "", value = [], options = FileTypes, className = "", onChange, AISelect = false }) {

    if (!Array.isArray(value)) {
        value = value.split(",");
    }

    const checkForValidity = () => {
        value = value.filter(item => {
            return options.includes(item);
        });

    }

    checkForValidity();

    const [state, setState] = useState({
        search: "", focusClassName: "unfocused", dropStatus: DropStatus.close
    })

    const handleChange = (index, e) => {
        const val = e.target.value;
        const nam = e.target.name;
        switch (nam) {
            case "search":
                break;
            default:
                if(AISelect){
                    let values = [];
                    for (let i = 0; i <= index; i++) {
                        value.push(options[i]);
                        if(!values.includes(options[i])){
                            values.push(options[i]);
                        }
                    }
                    const response = { target: { name: name, value: [...new Set(values)] } };
                    onChange(response);
                }
                else {
                    const checked = e.target.checked;
                    if (checked) {
                        if (!value.includes(val)) {
                            const response = { target: { name: name, value: value.concat(val) } };
                            onChange(response);
                        }
                    } else {
                        if (value.includes(val)) {
                            
                            const response = { target: { name: name, value: value.filter(v => v !== val) } };
                            onChange(response);
                        }
                    }
                }
                break;
        }

    }

    const child = (item, index) => {
        return (
            <div className="child" key={index} >
                <input type="checkbox" name={item} value={item} onChange={handleChange.bind(null, index)} checked={value.includes(item)} />
                <span >{item}</span>
            </div>
        )
    }

    return (
        <Dropdown contentType={DropContentType.flexible} status={state.dropStatus} dropdownClassName="options" className={className + " array-select"} id={id} type={DropType.focus} onChange={(status) => setState({ ...state, dropStatus: status })} title={<input type="text" name="search" placeholder="search" value={value.join(", ")} onChange={handleChange.bind(null, null)} style={{ maxWidth: '95%' }} />} >
            {
                options.map((item, i) => (child(item, i)))
            }
        </Dropdown>
    );
}

export default ArraySelect

const FileTypes = [
    ".PDF", ".CSV", ".MP3", "MP4", ".DOC", ".PPT"
]