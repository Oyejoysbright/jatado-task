import { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import Dropdown, { DropStatus, DropType } from './Dropdown';
import { Helper } from './Helper';

function SearchableSelect({ name = "", value = "", dataKey = "name", data = TEST_DATA, onChange, className = String, showingKeys = [], separator = " " }) {

    const [state, setState] = useState({
        dataList: data, focusClassName: "unfocused", [name]: "", dropStatus: DropStatus.close
    });

    if(typeof value !== "string") value = "";
    const handleChange = (e) => {
        onChange(e)
    }

    const handleClick = (obj = Object) => {
        const value = obj[dataKey];
        const e = {
            target: {
                name: name,
                value: value,
                objectValue: obj
            }
        }
        setState({ ...state, [name]: value });
        onChange(e);
    }

    useEffect(() => {
        if (state[name] === "" && data !== state.dataList) {
            setState({ ...state, dataList: data });
        }
        if (value !== state[name]) {
            setState(prev => { return { ...prev, [name]: value, dataList: Helper.searchV2(data, value) } });
        }

    }, [data, name, state, value]);

    const getText = (obj = Object) => {
        let res = "";
        for (let i = 0; i < showingKeys.length; i++) {
            res += (i < showingKeys.length-1)? obj[showingKeys[i]] + separator : obj[showingKeys[i]];
        }
        return res === "" ? obj[dataKey] : res;
    }

    return (
        <Dropdown status={state.dropStatus} type={DropType.focus} className={className + " array-select"} dropdownClassName="options" 
            title={<input type="text" name={name} value={state[name]} placeholder="search" onChange={handleChange} style={{ maxWidth: '95%' }} />}
            onChange={(status) => setState({ ...state, dropStatus: status })} src={<MdClose title="Close" className="btn-like" onClick={() => setState({ ...state, dropStatus: DropStatus.close })} />} >
            {
                state.dataList.map((obj, index) => (<div className="btn-like" title={obj[dataKey]} key={index} onClick={handleClick.bind(null, obj)}>{getText(obj)}</div>))
            }
        </Dropdown>
    );
}

export default SearchableSelect

const TEST_DATA = [
    { id: 1, name: "Ayomide Oyediran", age: 5 },
    { id: 2, name: "Agboola Samuel", age: 9 },
    { id: 3, name: "Peter Chukwu", age: 15 },
    { id: 4, name: "Ojonugwa Oji", age: 15 },
    { id: 5, name: "Rotimi Bolorunduro", age: 15 },
]