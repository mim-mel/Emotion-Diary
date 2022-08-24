import React,{ useReducer, useRef } from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import New from './pages/New'
import Edit from './pages/Edit'
import Diary from './pages/Diary'

//reducer 함수 구현
const reducer = (state, action)=>{
  let newState = [];
  switch(action.type) {
    case 'INIT' : {
      return action.data;
    }
    case 'CREATE' : {
      const newItem = {
        ...action.data
      };
      newState = [newItem, ...state];
      break;
    }
    case 'REMOVE' : {
      newState = state.filter((it)=>it.id !== action.targetId);
      break;
    }
    case 'EDIT' : {
      newState = state.map((it)=>it.id === action.data.id? {...action.data} : it)
      break;
    }
    default :
    return state;
  }
  return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  
  const dummyData = [
    {
      id : 1,
      emotion : 1,
      content : "오늘의 일기 1번",
      date : 1660802198969,
    },
    {
      id : 2,
      emotion : 2,
      content : "오늘의 일기 2번",
      date : 1660802198970,
    },
    {
      id : 3,
      emotion : 3,
      content : "오늘의 일기 3번",
      date : 1660802198972,
    },
    {
      id : 4,
      emotion : 4,
      content : "오늘의 일기 4번",
      date : 1660802198973,
    },
    {
      id : 5,
      emotion : 5,
      content : "오늘의 일기 5번",
      date : 1660802198975,
    },
  ];
  const [data, dispatch] = useReducer(reducer, dummyData);

  //똑같은 ID가 계속해서 발생하는 버그 이유
  //기작값을 0 => 6으로 바꿔주어야함
  const dataId = useRef(6);

  //CREATE
  const onCreate = (date, content, emotion)=>{
    dispatch({type : 'CREATE', data : {
      id: dataId.current,
      date: new Date(date).getTime(),
      content,
      emotion,
    }});
    dataId.current += 1;
  };

  //REMOVE
  const onRemove = (targetId)=>{
    dispatch({type : 'REMOVE', targetId})
  };

  //EDIT
  const onEdit = (targetId, date, content, emotion)=>{
    dispatch({type : 'EDIT', 
              data : {
                id : targetId,
                date : new Date(date).getTime(),
                content,
                emotion,
              }
            });
  };


  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{onCreate, onEdit, onRemove}}>
        <BrowserRouter>
          <div className='App'>
            <Routes>
              <Route path='/' element = {<Home/>}/>
              <Route path='/new' element = {<New/>}/>
              <Route path='/edit/:id' element = {<Edit/>}/>
              <Route path='/diary/:id' element = {<Diary/>}/>
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
