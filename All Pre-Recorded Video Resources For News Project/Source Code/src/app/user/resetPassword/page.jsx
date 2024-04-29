import React from 'react';
import PlainLayout from "@/components/master/Plain-Layout";
import SetPasswordForm from "@/components/user/SetPasswordForm";
import {cookies} from "next/headers";
import { redirect } from 'next/navigation'
const Page = () => {

    const cookieStore = cookies()
    const token = cookieStore.get('token')
    if(typeof token!=='undefined'){
        redirect('/')
    }

    return (
        <PlainLayout>
            <SetPasswordForm/>
        </PlainLayout>
    );
};

export default Page;