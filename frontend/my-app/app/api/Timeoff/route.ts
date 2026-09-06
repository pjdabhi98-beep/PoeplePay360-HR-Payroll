import { NextResponse } from "next/server";

const FASTAPI_URL =
  process.env.FASTAPI_URL || "http://127.0.0.1:8000";

export async function GET() {
  try {
    console.log("Calling FastAPI Time Off...");

    const response = await fetch(
      `${FASTAPI_URL}/time-off/`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          Accept: "application/json",
        },
      }
    );

    console.log(
      "FastAPI Time Off status:",
      response.status
    );

    const text = await response.text();

    console.log(
      "FastAPI Time Off response:",
      text
    );

    let data: any;

    try {
      data = JSON.parse(text);
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "FastAPI returned invalid JSON",
          response: text,
        },
        {
          status: 502,
        }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error:
            data?.detail ||
            data?.error ||
            "FastAPI request failed",
        },
        {
          status: response.status,
        }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(
      "Time Off API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to connect to FastAPI",
      },
      {
        status: 500,
      }
    );
  }
}