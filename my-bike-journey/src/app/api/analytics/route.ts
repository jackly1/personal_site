import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get("days") || "7");

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    // Get analytics data
    const analytics = await prisma.analytics.findMany({
      where: {
        date: {
          gte: startDate,
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    // Get landmark visit counts
    const landmarkStats = await prisma.visit.groupBy({
      by: ["landmarkId"],
      where: {
        timestamp: {
          gte: startDate,
        },
        landmarkId: {
          not: null,
        },
      },
      _count: {
        landmarkId: true,
      },
    });

    // Get total unique visitors
    const uniqueVisitors = await prisma.visitor.count({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
    });

    // Get total visits
    const totalVisits = await prisma.visit.count({
      where: {
        timestamp: {
          gte: startDate,
        },
      },
    });

    return NextResponse.json({
      analytics,
      landmarkStats,
      uniqueVisitors,
      totalVisits,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
