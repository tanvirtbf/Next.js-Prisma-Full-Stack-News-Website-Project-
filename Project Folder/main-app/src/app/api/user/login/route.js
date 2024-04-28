import { CreateToken } from "@/utility/JWTTokenHelper";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    let reqBody = await req.json();
    const prisma = new PrismaClient();
    let result = await prisma.users.findUnique({
      where: reqBody,
    });
    if (result.length === 0) {
      return NextResponse.json({
        status: "Not Found",
        data: result,
      });
    } else {
      let token = await CreateToken(reqBody["email"], reqBody["id"]);
      let expireDuration = new Date(Date.now() + 24 * 60 * 60 * 1000);
      let cookieString = `token=${token};expire=${expireDuration};path=/`;
      return NextResponse.json(
        {
          status: "Success",
          data: token,
        },
        {
          status: 200,
          headers: { "set-cookie": cookieString },
        }
      );
    }
  } catch (e) {
    return NextResponse.json({
      status: "fail",
      data: e,
    });
  }
}
