import { useState, useEffect } from 'react';
interface Props {
    timeInSeconds: number
}
const Timer = ({timeInSeconds}:Props) => {

    const [seconds, setSeconds ] =  useState(timeInSeconds);
    const [time, setTime] = useState({hh: 0, mm: 0, ss: 0})

    const secondsToTime = (secs: number) => {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        setTime({
            hh: hours,
            mm: minutes,
            ss: seconds
        })
        setSeconds(secs -1 )
    }

    useEffect(()=>{

        let myInterval = setInterval(() => {
            if(seconds > 0){
                secondsToTime(seconds)
            }
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
        };
    });
    return (
        <div>
            {
                <span>{time.hh}:{time.mm}:{time.ss}</span>
            }
        </div>
    )
}

export default Timer;