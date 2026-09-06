import { NextResponse } from "next/server";

const FASTAPI_URL =
  process.env.FASTAPI_URL || "http://127.0.0.1:8000";

export async function GET() {
  try {
    const response = await fetch(
      `${FASTAPI_URL}/contracts/`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const text = await response.text();

      return NextResponse.json(
        {
          success: false,
          error: "FastAPI request failed",
          response: text,
        },
        {
          status: response.status,
        }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);

  } catch (error) {
    console.error("Contract API error:", error);

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