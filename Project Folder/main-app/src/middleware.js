import { NextRequest, NextResponse } from "next/server";
import { VerifyToken } from "./utility/JWTTokenHelper";

export async function middleware(req,res){
  try {
    let token = req.cookies.get('token')
    let payload = VerifyToken(token['value'])
    const requestHeaders=new Headers(req.headers)
    requestHeaders.set('email',payload['email'])
    requestHeaders.set('id',payload['id'])

    return NextResponse.next({request: {headers: requestHeaders}})

  } catch (e) {
    const requestHeaders=new Headers(req.headers)
    requestHeaders.set('email','0')
    requestHeaders.set('id','0')
    return NextResponse.next({request: {headers: requestHeaders}})
  }
}