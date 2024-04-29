"use client"
import React, {useState} from 'react';
import SubmitButton from "@/components/master/SubmitButton";
import {ErrorToast, IsEmail, IsEmpty, SuccessToast} from "@/utility/FormHelper";
import {useRouter} from "next/navigation";

const SignUpForm = () => {

    let [data,setData]=useState({firstName:"",lastName:"",email:"",mobile:"",password:"",otp:"0"})
    let [submit,setSubmit]=useState(false)
    let router=useRouter()


    const inputOnChange = (name,value) => {
        setData((data)=>({
            ...data,
            [name]: value
        }))
    }


    const formSubmit=async ()=>{

        if(IsEmpty(data.firstName)){
            ErrorToast("First Name Required!")
        }
        else if(IsEmpty(data.lastName)){
            ErrorToast("Last Name Required!")
        }
        else if(IsEmpty(data.email)){
            ErrorToast("Email Address Required!")
        }
        else if(IsEmpty(data.mobile)){
            ErrorToast("Mobile No Required!")
        }
        else if(IsEmpty(data.password)){
            ErrorToast("Password Required!")
        }
        else {
            setSubmit(true);
            const options={method:'POST', body:JSON.stringify(data)}

            let res=await (await fetch("/api/user/registration",options)).json();
            setSubmit(false);

            if(res['status']==="success"){
                SuccessToast("Request Success")
                router.push("/user/login")
            }
            else{
                ErrorToast("Invalid Request ! ")
            }

        }

    }


    return (
        <div>
            <div className="row h-100  justify-content-center center-screen">
                <div className="col-md-8 col-lg-8 col-sm-12 col-12 ">
                    <div className="card container-fluid animated fadeIn p-5 gradient-bg">
                        <div className="row ">
                            <h5 className="mb-1 mx-0 px-0">User Registration</h5>
                            <div className="col-md-4 col-lg-4 col-sm-12 p-1 col-12">
                                <label className="form-label">First Name</label>
                                <input value={data.firstName} onChange={(e)=>{inputOnChange('firstName',e.target.value)}} type="text" className="form-control"/>
                            </div>
                            <div className="col-md-4 col-lg-4 col-sm-12 p-1 col-12">
                                <label className="form-label">Last Name</label>
                                <input value={data.lastName} onChange={(e)=>{inputOnChange('lastName',e.target.value)}} type="text" className="form-control"/>
                            </div>
                            <div className="col-md-4 col-lg-4 col-sm-12 p-1 col-12">
                                <label className="form-label">Mobile</label>
                                <input value={data.mobile} onChange={(e)=>{inputOnChange('mobile',e.target.value)}} type="text" className="form-control"/>
                            </div>
                            <div className="col-md-4 col-lg-4 col-sm-12 p-1 col-12">
                                <label className="form-label">Email</label>
                                <input value={data.email} onChange={(e)=>{inputOnChange('email',e.target.value)}} type="email" className="form-control"/>
                            </div>
                            <div className="col-md-4 col-lg-4 col-sm-12 p-1 col-12">
                                <label className="form-label">Password</label>
                                <input value={data.password}  onChange={(e)=>{inputOnChange('password',e.target.value)}} type="password" className="form-control"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 col-lg-4 col-sm-12 p-1 col-12">
                                <SubmitButton className="btn btn-danger w-100 mt-3" submit={submit} onClick={formSubmit} text="Sign Up"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;