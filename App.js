import React, {useCallback, useEffect} from 'react';
import { MainLayout } from './src/MainLayout';
import { setStatusBarHidden } from 'expo-status-bar';
import { ElementState } from './src/context/ElementState';
import { DB } from './src/db';

function App() {
  const getTables = useCallback(async () => {
    try {
      await DB.getTables().then((result) => {
        let dt = new Date();
        dt = dt.toLocaleDateString();
        let day = dt.slice(3,5);
        let month = dt.slice(0,2);
        let year = dt.slice(6);
        result.forEach(res => {
            if (res.name.length === 8) {
                let daytable = res.name.slice(3,5);
                let monthtable = res.name.slice(0,2);
                let yeartable = res.name.slice(6);
                if (+yeartable < +year) {
                    DB.deleteTable(res.name);
                    return;
                } else if (+monthtable < +month) {
                    DB.deleteTable(res.name);
                    return;
                } else if (+daytable < +day) {
                    DB.deleteTable(res.name);
                    return;
                }
            }
        })
    })
    } catch (e) {
      console.log(e)
    }
  }, [getTables]);

  useEffect(() => {
    getTables()
  }, []);

  setStatusBarHidden(true);

  return (
    <ElementState>
      <MainLayout/>
    </ElementState>
  );
}

export default App;