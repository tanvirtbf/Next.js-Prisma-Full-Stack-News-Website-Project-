"use client"
import React, {useState} from 'react';
import SubmitButton from "@/components/master/SubmitButton";
import {ErrorToast, GetEmail, GetOTP, IsEmail, IsEmpty, SetEmail, SetOTP, SuccessToast} from "@/utility/FormHelper";
import {useRouter} from "next/navigation";

const SetPasswordForm = () => {
    let router=useRouter()
    let [data,setData]=useState({email:GetEmail(), otp:GetOTP(),password:""})
    let [submit,setSubmit]=useState(false)

    const inputOnChange = (name,value) => {
        setData((data)=>({
            ...data,
            [name]: value
        }))
    }

    const formSubmit=async ()=>{
        if(IsEmpty(data.password)){
            ErrorToast("Password Required!")
        }
        else {
            setSubmit(true);
            const options={method:'POST', body:JSON.stringify(data)}
            let res=await (await fetch(`/api/user/recover/resetPassword`,options)).json();
            setSubmit(false);

            if(res['status']==="success"){
                SuccessToast("Request Completed");
                sessionStorage.clear();
                router.push("/user/login")
            }
            else {
                ErrorToast("Invalid Request")
            }
        }
    }

    return (
        <div className="row h-100 justify-content-center center-screen">
            <div className="col-md-4 col-lg-4 col-sm-12 col-12 ">
                <div className="card animated fadeIn p-5 gradient-bg">
                    <h5 className="mb-3">New Password</h5>
                    <input value={data.password} onChange={(e) => {inputOnChange('password', e.target.value)}} type="password" className="form-control mb-2"/>
                    <SubmitButton className="btn btn-danger mt-3" onClick={formSubmit} submit={submit} text="Next"/>
                </div>
            </div>
        </div>
    );
};

export default SetPasswordForm;