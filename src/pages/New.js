import { useEffect } from "react"; 
import DiaryEditior from "../components/DiaryEditior";

const New = ()=>{

    useEffect(()=>{
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = `감정 일기장 - 새 일기`
    },[]);

    return(
        <div>
            <DiaryEditior />
        </div>
    )
}

 
    
export default New;