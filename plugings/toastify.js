import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastMessage = (mgs,status)=>{
    const config={
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    }
    if(status=='i'){
        toast.info(mgs,config);
    }
    else if(status=='s'){
        toast.success(mgs,config);
    }
    else if(status=='w'){
        toast.warning(mgs,config);
    }
    else if(status=='e'){
        toast.error(mgs,config);
    }
}
export default toastMessage