import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const getPasswords = async() => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    setpasswordArray(passwords);
    // let passwords = localStorage.getItem("passwords"); //THis code is for storing data in localStorage
    // if (passwords) {
    //   setpasswordArray(JSON.parse(passwords));
    // }
    
  }
  

  // useEffect(() => {
  //   getPasswords()

  // }, []);

  const savePassword = async() => {
    // console.log(form)
    if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3 && form.site.startsWith("http")|| form.site.startsWith("https")){

      

      console.log(form.password)

      // If any such id exists in the db, delete it
      //  await fetch("http://localhost:5173/",{method:"DELETE", headers:{"Content-Type":"application/json"},body:JSON.stringify({id:form.id})})

      setpasswordArray([...passwordArray, {...form, id: uuidv4()}]);

       const result =  await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...form, id: uuidv4() })
      });
      
       console.log(result)

      // localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));

      setform({site:"",username:"",password:""})
      toast('✎ Password Saved Successfully!', {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }else{
      toast('Error: Invaild Credentials',{theme:"dark"});
    }
    // console.log(passwordArray)
  };

  const deletePassword = async(id) => {
   let conf = confirm("Do you want to delete this.")
    if(conf){
      setpasswordArray(passwordArray.filter(item=>item.id!==id))
      // localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!==id)))

       await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type":"application/json", body: JSON.stringify({id})}})

      toast('🚮 Password Deleted Successfully!', {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  };

  const editPassword = (id) => {
  //  setform(passwordArray.filter(item=>item.id===id)[0])
   setform({...passwordArray.filter(item=>item.id===id)[0], id:id})
   setpasswordArray(passwordArray.filter(item=>item.id!==id))

  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const showPassword = () => {
    // alert("show password");
    if (ref.current.state === "hover-cross") {
      ref.current.state = null;
      passwordRef.current.type = "password";
    } else {
      ref.current.state = "hover-cross";
      passwordRef.current.type = "text";
    }
  };

  const copyText = (text) => {
    toast('🦄 Copy to clipboard!', {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    navigator.clipboard.writeText(text)

  }
  

  return (
    <>
    {/* react tostify -> toast container it is prefer to import immediately after empty tag.*/}
    <ToastContainer
position="bottom-right"
autoClose={1500}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
      {/* Background div */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="p-3 md:mycontainer md:min-h-[83.7vh] min-h-[87.5vh]">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          Sec
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own Password Manager
        </p>

        <div className="text-black flex flex-col p-4 gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter  Username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="password"
                name="password"
                id="password"
              />
              <span onClick={showPassword} className="absolute right-0">
                <lord-icon
                  ref={ref}
                  src="https://cdn.lordicon.com/vfczflna.json"
                  trigger="hover"
                  stroke="bold"
                  colors="primary:#121331,secondary:#121331"
                  style={{
                    width: 20 + "px",
                    height: 20 + "px",
                    position: "absolute",
                    right: 5,
                    top: 6,
                    cursor: "pointer",
                  }}
                ></lord-icon>
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 bg-green-500 hover:bg-green-400 rounded-full border-2 border-green-800 hover:border px-4 py-2 w-fit"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-xl py-4 ">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center gap-2">
                          <a href={`${item.site}`} target="_blank">
                            {item.site}
                          </a>
                          <div className="lordiconcopy cursor-pointer" onClick={()=>{copyText(item.site)}}>
                            <lord-icon
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                "paddingTop": "3px",
                                "paddingLeft": "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="  py-2 border border-white text-center">
                        <div className="flex items-center justify-center gap-2">
                          {item.username}
                          <div className="lordiconcopy cursor-pointer" onClick={()=>{copyText(item.username)}}>
                            <lord-icon
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                "paddingTop": "3px",
                                "paddingLeft": "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center gap-2">
                         <span> {"*".repeat(item.password.length)} </span>
                          <div className="lordiconcopy cursor-pointer" onClick={()=>{copyText(item.password)}}>
                            <lord-icon
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                "paddingTop": "3px",
                                "paddingLeft": "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center gap-3">
                        <span className="edit" onClick={()=>{editPassword(item.id)}}>
                        <lord-icon src="https://cdn.lordicon.com/gwlusjdu.json"
                        trigger="hover" style={{"width":"25px","height":"25px","cursor":"pointer","paddingTop": "3px","paddingLeft": "3px"}}></lord-icon>
                        </span>

                        <span className="delete" onClick={()=>{deletePassword(item.id)}}>
                        <lord-icon src="https://cdn.lordicon.com/skkahier.json"
                        trigger="hover" style={{"width":"25px","height":"25px","cursor":"pointer","paddingTop": "3px","paddingLeft": "3px"}}></lord-icon>
                        </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
