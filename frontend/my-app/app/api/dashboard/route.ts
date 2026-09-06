import { NextResponse } from "next/server";

const FASTAPI_URL =
  process.env.FASTAPI_URL || "http://127.0.0.1:8000";

export async function GET() {
  try {
    const response = await fetch(`${FASTAPI_URL}/dashboard`, {
      method: "GET",
      cache: "no-store",
      signal: AbortSignal.timeout(10000), // Set a timeout of 5 seconds
    });

    if (!response.ok) {
      const text = await response.text();

      return NextResponse.json(
        {
          success: false,
          error: "FastAPI request failed",
          status: response.status,
          response: text,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);

  } catch (error) {
    console.error("Dashboard API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to connect to FastAPI",
      },
      { status: 500 }
    );
  }
}