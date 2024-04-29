import React from 'react';
import PlainLayout from "@/components/master/Plain-Layout";
import parse from "html-react-parser";
async function getData(){
    return (await (await fetch(`${process.env.HOST}/api/policy?type=terms`)).json())['data']
}


const Page = async () => {
    let data=await getData();
    return (
        <PlainLayout>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-12">
                        <div className='card p-4'>
                            {parse(data[0]['long_des'])}
                        </div>
                    </div>
                </div>
            </div>
        </PlainLayout>
    );
};

export default Page;