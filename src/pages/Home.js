import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";

import MyHeader from './../components/MyHeader';
import MyButton from './../components/MyButton';
import DiaryList from "../components/DiaryList";


const Home = ()=>{
    const diaryList = useContext(DiaryStateContext);

    const [data, setData] = useState([]);
    const [curDate, setCurDate] = useState(new Date());
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월 `

    useEffect(()=>{
        // 해당 월에 작성된 일기들만 추리기
        if (diaryList.length >= 1){
            const firstDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1
            ).getTime();
    
            const lastDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth() + 1,
                //마지막 날짜만 입력해놓음
                //시간 분 초까지 입력해놔야 더 정확히 반영됨
                0,
                23,
                59,
                59,
            ).getTime();
    
            setData(diaryList.filter((it)=> firstDay <= it.date && it.date <= lastDay))
        }
    },[diaryList,curDate])

    const increaseMonth = ()=>{
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
        );
    }

    const decreaseMonth = ()=>{
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
        );
    }

    return(
        <div>
            <MyHeader headText={headText}
                      leftChild={<MyButton text={'<'} onClick={decreaseMonth}/>}
                      rightChild={<MyButton text={'>'} onClick={increaseMonth}/>}
            />
            <DiaryList diaryList={data}/>
        </div>
    );
};

export default Home;