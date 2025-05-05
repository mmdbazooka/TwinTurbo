function counter(secS,sSecS,minS,sMins,hrS,sHrs,dayS,sDayS,monS,sMonS) {
    let countDown = setTimeout(() => {
    sSecS(secS - 1)
        if(secS == 0) {
            sSecS(59)
            sMins(minS - 1)
        }
        if(minS == 0 && secS == 0) {
            sMins(59)
            sHrs(hrS - 1)
        }
        if(hrS == 0 && minS == 0) {
            sHrs(23)
            sDayS(dayS - 1)
        }
        if(dayS == 0 && hrS == 0) {
            sDayS(30)
            sMonS(monS - 1)
        }
        if(monS == 0) clearTimeout(countDown)
    }, 1000);
}

export default counter