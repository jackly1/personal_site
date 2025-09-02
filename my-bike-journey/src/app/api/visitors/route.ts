import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getClientIP } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const { userAgent, country, city } = await request.json();
    const ipAddress = getClientIP(request);

    // Check if visitor already exists
    let visitor = await prisma.visitor.findUnique({
      where: { ipAddress },
    });

    if (!visitor) {
      // Create new visitor
      visitor = await prisma.visitor.create({
        data: {
          ipAddress,
          userAgent,
          country,
          city,
        },
      });
    } else {
      // Update existing visitor
      visitor = await prisma.visitor.update({
        where: { id: visitor.id },
        data: {
          userAgent,
          country,
          city,
        },
      });
    }

    return NextResponse.json({ visitorId: visitor.id });
  } catch (error) {
    console.error("Error creating/updating visitor:", error);
    return NextResponse.json(
      { error: "Failed to track visitor" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const ipAddress = getClientIP(request);

    const visitor = await prisma.visitor.findUnique({
      where: { ipAddress },
      include: {
        visits: {
          include: {
            landmark: true,
          },
          orderBy: {
            timestamp: "desc",
          },
        },
      },
    });

    return NextResponse.json({ visitor });
  } catch (error) {
    console.error("Error fetching visitor:", error);
    return NextResponse.json(
      { error: "Failed to fetch visitor data" },
      { status: 500 }
    );
  }
}
