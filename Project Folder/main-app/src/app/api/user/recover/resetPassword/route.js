import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req,res){
  try {
    const prisma = new PrismaClient();
    let reqBody = await req.json();
    let count = await prisma.users.count({
      where:{otp: reqBody['otp'],email:reqBody['email']}
    })
    if()
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