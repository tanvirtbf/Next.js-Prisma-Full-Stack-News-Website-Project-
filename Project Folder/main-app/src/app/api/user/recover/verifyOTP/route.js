import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req,res){
  try {
    const prisma = new PrismaClient();
    let reqBody = await req.json();

    let count = await prisma.users.count({
      where:reqBody,
    })
    if(count === 1){
      return NextResponse.json({
        status:'success',
        data: 'Valid OTP Code',
      })
    }else{
      return NextResponse.json({
        status:'fail',
        data: 'Invalid OTP Code'
      })
    }

  } catch (error) {
    return NextResponse.json({
      staus:'fail',
      data: error,
    })
  }
}