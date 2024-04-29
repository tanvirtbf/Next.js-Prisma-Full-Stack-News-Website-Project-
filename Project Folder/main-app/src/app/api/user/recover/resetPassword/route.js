import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req,res){
  try {
    const prisma = new PrismaClient();
    let reqBody = await req.json();
    let result = await prisma.users.update({
      where:{email: reqBody['email']},
      data: {password: reqBody['password'], otp: reqBody['otp']}
    })
    return NextResponse.json({
      status:'success',
      data: result,
    })
  } catch (error) {
    return NextResponse.json({
      status:'fail',
      data: error,
    })
  }
}