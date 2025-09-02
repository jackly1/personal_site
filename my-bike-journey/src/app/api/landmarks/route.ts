import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const landmarks = await prisma.landmark.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ landmarks });
  } catch (error) {
    console.error("Error fetching landmarks:", error);
    return NextResponse.json(
      { error: "Failed to fetch landmarks" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, details, splineObjectName, position } =
      await request.json();

    const landmark = await prisma.landmark.create({
      data: {
        title,
        description,
        details,
        splineObjectName,
        position,
        isActive: true,
      },
    });

    return NextResponse.json({ landmark });
  } catch (error) {
    console.error("Error creating landmark:", error);
    return NextResponse.json(
      { error: "Failed to create landmark" },
      { status: 500 }
    );
  }
}
