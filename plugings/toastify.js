import Swal from "sweetalert2";
const toastMessage = (message, status) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background:'#113946',
    color:'#EAD7BB',
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  let icon = "";
  if (status == "i") {
    icon = "info";
  } else if (status == "s") {
    icon = "success";
  } else if (status == "w") {
    icon = "warning";
  } else if (status == "e") {
    icon = "error";
  }
  Toast.fire({
    icon: icon,
    title: message
  });
};
export default toastMessage;
