import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getClientIP } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const { visitorId, landmarkId, duration } = await request.json();
    const ipAddress = getClientIP(request);

    // Verify visitor exists and matches IP
    const visitor = await prisma.visitor.findFirst({
      where: {
        id: visitorId,
        ipAddress,
      },
    });

    if (!visitor) {
      return NextResponse.json({ error: "Invalid visitor" }, { status: 400 });
    }

    // Create visit record
    const visit = await prisma.visit.create({
      data: {
        visitorId,
        landmarkId,
        duration,
      },
    });

    // Update daily analytics
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await prisma.analytics.upsert({
      where: { date: today },
      update: {
        totalVisits: {
          increment: 1,
        },
        landmarkStats: {
          ...(landmarkId && {
            [landmarkId]: {
              increment: 1,
            },
          }),
        },
      },
      create: {
        date: today,
        totalVisits: 1,
        uniqueVisitors: 0,
        landmarkStats: landmarkId ? { [landmarkId]: 1 } : {},
      },
    });

    return NextResponse.json({ visit });
  } catch (error) {
    console.error("Error creating visit:", error);
    return NextResponse.json(
      { error: "Failed to track visit" },
      { status: 500 }
    );
  }
}
