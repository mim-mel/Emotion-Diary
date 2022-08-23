import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';

import MyHeader from './MyHeader';
import MyButton from './MyButton';
import EmotionItem from './EmotionItem';
import { DiaryDispatchContext } from '../App';
import { getStringDate } from '../util/date';
import { emotionList } from '../util/emotion';

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || '';


const DiaryEditior = ({isEdit, originData})=>{
    const navigate = useNavigate();

    const contentRef = useRef();
    const [emotion, setEmotion] = useState(3);
    const [date, setDate] = useState(getStringDate(new Date()));
    const [content, setContent] = useState("");
    const {onCreate, onEdit} = useContext(DiaryDispatchContext);

    const handleClickEmote = (emotion) => {
        setEmotion(emotion);
    }

    const handleSubmit = ()=>{
        if(content.length < 1){
            contentRef.current.focus();
            return;
        }

        if(window.confirm(isEdit? "일기를 수정 하시겠습니까?" : "새로운 일기를 작성하기셌습니까?")){
            if(!isEdit){
                onCreate(date, content, emotion);
            }else{
                onEdit(originData.id, date, content, emotion )
            }
        }


        navigate('/', {replace : true});
    }

    useEffect(()=>{
        if(isEdit){
            //isEdit이 true일때만 실행됨
            //edit페이지 로드될때에만 동작이 실행됨
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setEmotion(originData.emotion);
            setContent(originData.content);
        }
    },[isEdit, originData])

    return(
        <div className='DiaryEditior'>
            <MyHeader headText={isEdit? '일기 수정하기':'새 일기쓰기'}
                    leftChild={<MyButton text={'< 뒤로가기'} onClick={()=>navigate(-1)}/>}
            />
            <div>
                <section>
                    <h4>오늘은 언제인가요?</h4>
                    <div className='input_box'>
                        <input 
                            className='input_date'
                            value={date} 
                            onChange={(e)=>setDate(e.target.value)} 
                            type='date'
                        />
                    </div> 
                </section>

                <section>
                    <h4>오늘의 감정</h4>
                    <div className='input_box emotion_list_wrapper'>
                        {emotionList.map((it)=>(
                            <EmotionItem key={it.emotion_id} 
                                         {...it} 
                                         onClick={handleClickEmote}
                                         isSelected={it.emotion_id === emotion}
                                         //값을 비교해 선택되었는지 아닌지를 알 수 있음
                            />
                        ))}
                    </div>
                </section>
                <section>
                    <h4>오늘의 일기</h4>
                    <div className='input_box text_wrapper'>
                        <textarea 
                            ref={contentRef}
                            value={content}
                            onChange={(e)=>setContent(e.target.value)}
                            placeholder="오늘은 어땠나요?"
                        />
                    </div>
                </section>
                <section>
                    <div className='control_box'>
                        <MyButton text={'취소하기'} type={'negative'} onClick={()=>navigate(-1)}/>
                        <MyButton text={'작성완료'} type={'positive'} onClick={handleSubmit}/>
                    </div>
                </section>
            </div>
        </div>
    );
};


export default DiaryEditior;