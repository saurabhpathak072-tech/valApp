// app/api/users/route.ts
import ShowMessage from "@/app/models/ShowMessage";
import dbConnect from "@/lib/mongoose";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect(); // Connect to DB

  try {
    const body = await request.json();
    const newResponse = await ShowMessage.create(body); // Validation happens here
    return NextResponse.json(newResponse, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
export async function GET() {
  console.log("GET /api/showmessage called");
  await dbConnect(); // Connect to DB

  try {
    const responses = await ShowMessage.find({});
    return NextResponse.json(responses, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
