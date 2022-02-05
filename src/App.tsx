import { ChangeEvent, useState } from 'react';
import './App.css';
import SearchableSelect from './utils/SearchableSelect';
import ArraySelect from './utils/ArraySelect';
import InputFileButton from './utils/InputFileButton';
import { Helper } from './utils/Helper';

interface IState {
  search: string;
  file: string;
  types: string[];
  validationFlag: boolean | null;
}

function App() {

  const [state, setState] = useState<IState>({
    search: "", file: "", types: [], validationFlag: null
  });

  const checkFileCompatibility = (filePath: string) => {
    const ext: string = Helper.getFileExtension(filePath, 1);
    setState(prev => ({ ...prev, validationFlag: state.types.includes(ext.toUpperCase()) }))
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({ ...prev, [e.target.name]: e.target.value }));

    if (e.target.name === "file") {
      checkFileCompatibility(e.target.value);
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <label>Search</label>
          <SearchableSelect name={"search"} value={state.search} onChange={handleChange.bind(null)} />
        </div>
        <div>
          <label>Select Acceptable File Format</label>
          <ArraySelect name="types" value={state.types} onChange={handleChange.bind(null)} />
          <InputFileButton name={"file"} value={state.file} onChange={handleChange.bind(null)} accept={state.types.join(",")} showStatus={false} />
          <div>
            {
              state.validationFlag !== null && (
                <>
                  {
                    state.validationFlag ? <span className='green'>File Supported</span> : <span className='red'>File Not Supported</span>
                  }
                </>
              )
            }
          </div>
          <div>
            <button disabled={!state.validationFlag}>Save</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
