import { NextResponse } from "next/server";

const FASTAPI_URL =
  process.env.FASTAPI_URL || "http://127.0.0.1:8000";

export async function GET() {
  try {
    const response = await fetch(`${FASTAPI_URL}/employees/`, {
      method: "GET",
      cache: "no-store",
    });

    const data = await response.json();

    console.log("FastAPI Employee Response:", data);

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: "FastAPI request failed",
          response: data,
        },
        {
          status: response.status,
        }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Employee API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}