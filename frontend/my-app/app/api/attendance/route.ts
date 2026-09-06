import { NextResponse } from "next/server";

const FASTAPI_URL =
  process.env.FASTAPI_URL || "http://127.0.0.1:8000";

export async function GET() {
  try {
    console.log("Calling FastAPI Attendance...");

    const response = await fetch(
      `${FASTAPI_URL}/attendance/`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const text = await response.text();

    console.log("FastAPI Attendance status:", response.status);
    console.log("FastAPI Attendance response:", text);

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "FastAPI returned non-JSON response",
          response: text,
        },
        { status: 500 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: "FastAPI request failed",
          response: data,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error("Attendance API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}