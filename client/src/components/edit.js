import React, {useState,useEffect} from "react";
import { useParams,useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Edit(){
    const [form,setForm]= useState({
        name:"",
        number:"",
        admin_no:"",
        users:[],

    })
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() =>{
        async function fetchData(){
            const id = params.id.toString();
            const response = await fetch(`http://localhost:5050/user/${params.id.toString()}`);
            if (!response.ok){
                const message = `An error has occured:${response.statusText}`;
                window.alert(message)
                return;
            }

            const user = await response.json();
            if (!user){
                window.alert(`Record with id ${id} not found`);
                navigate("/");
                return;
            }
            
            setForm(user)
        }
        fetchData()
        return;
    },[params.id, navigate]
    )
    

    function updateForm(value){
        return setForm((prev)=>{
            return { ...prev, ...value}
        })

        
    }
    async function onSubmit(e){
        e.preventDefault();
        if (!form.name || !form.number || !form.admin_no) {
            showError("All fields must be filled");
            return;
          }
      
          if (!/^\d+$/.test(form.number)) {
            showError("Phone number must contain numbers only");
            return;
          }
      
          if (form.number.length !== 8) {
            showError("Phone Number must be 8 digits");
            return;
          }
      
          if (form.admin_no.length !== 8 || !/^\d{7}[A-Z]$/.test(form.admin_no)) {
            showError("Admin Number is not in the right format");
            return;
          }
        const editedUser={
            name: form.name,
            number: form.number,
            admin_no: form.admin_no

        }
        await fetch(`http://localhost:5050/user/${params.id}`,{
            method: "PATCH",
            body: JSON.stringify(editedUser),
            headers:{
                'Content-Type':'application/json'
            }
        })
        showSuccess("User successfully updated!");
        navigate("/")
    }
    const showError = (message) => {
        toast.error(message, {
          position: "top-right",
          autoClose: 5000, // 5 seconds
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      };
      const showSuccess = (message) => {
        toast.success(message, {
          position: "top-right",
          autoClose: 5000, // 5 seconds
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      };
    return(
        <div>
            <h3>Update User</h3>
            <ToastContainer />
            <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                type="text"
                className="form-control"
                id="name"
                value={form.name}
                onChange={(e) => updateForm({name: e.target.value})}
                />
            </div>
            <div className="form-group">
                <label htmlFor="position">Phone Number</label>
                <input
                type="tel"
                className="form-control"
                id="number"
                value={form.number}
                onChange={(e) => updateForm({number: e.target.value})}
                />
            </div>
            <div className="form-group">
                <label htmlFor="position">Admin Number</label>
                <input
                type="text"
                className="form-control"
                id="admin_no"
                value={form.admin_no}
                onChange={(e) => updateForm({admin_no: e.target.value})}
                />
            </div>
            <div>
                <div className="form-group">
                    <input
                    type="submit"
                    value="Update User"
                    className="btn btn-primary">
                        
                    </input>
                </div>
            </div>
                
            </form>
        </div>
    )
}