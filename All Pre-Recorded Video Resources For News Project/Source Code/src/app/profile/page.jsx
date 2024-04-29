import React from 'react';
import PlainLayout from "@/components/master/Plain-Layout";
import {cookies} from "next/headers";
import ProfileForm from "@/components/profile/profile-form";

async function getData(cookies) {
    let option={method: 'GET', headers: {'Cookie': cookies}, cache: 'no-store'}
    let profile = (await (await fetch(`${process.env.HOST}/api/user/profile/details`,option)).json())['data'];
    return { profile: profile };
}

const Page = async () => {

    const cookieStore = cookies()
    let data=await getData(cookieStore);

    return (
        <PlainLayout>
            <ProfileForm data={data['profile']} />
        </PlainLayout>
    );
};

export default Page;