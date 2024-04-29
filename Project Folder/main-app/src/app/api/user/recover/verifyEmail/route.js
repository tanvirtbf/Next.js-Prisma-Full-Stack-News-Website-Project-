import { SendEmail } from "@/utility/EmailUtility";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req,res){
  try {
    let {searchParams} = new Url(req.url)
    let email = searchParams.get('email')

    //User Count
    const prisma = new PrismaClient();
    const count = prisma.users.count({
      where:{email:email}
    })
    
    if(count === 1){
      let code = Math.floor(100000+Math.random()*900000);
      let EmailText = `Your OTP Code is ${code}`
      let EmailSubject = "Next News Verification Code"
      await SendEmail(email,EmailText,EmailSubject)
      let result = await prisma.users.update({
        where:{email:email},
        data:{otp:code.toString()}
      })
      return NextResponse.json({
        status:'Success',
        data: result,
      })
    }else{
      return NextResponse.json({
        status: 'Fail',
        data:'No User Found',
      })
    }
  } catch (error) {
    return NextResponse.json({
      status: 'fail',
      data: error,
    })
  }
}