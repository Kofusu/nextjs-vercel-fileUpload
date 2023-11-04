import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function GET(req: NextRequest, res: NextResponse) {
  console.log(req.body);
  
  return NextResponse.json({ data: "Perkele" }, {status: 200})
}

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.formData()
  const fileUpload: File = body.get('fileUpload') as File
  console.log(fileUpload);

  const bytes = await fileUpload.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const path = join(process.cwd(), "public", fileUpload.name)
  await writeFile(path, buffer)
  console.log(`uploaded on ${path}`);
  

  return NextResponse.json({ data: "Perkele" }, {status: 200})
}