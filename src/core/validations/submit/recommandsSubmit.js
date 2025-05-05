import { toast } from 'react-toastify';

const recommandsSubmit = (value,toastData , st)=> {
    st(localStorage.getItem("theme"))
    toast(toastData)
}

export default recommandsSubmit