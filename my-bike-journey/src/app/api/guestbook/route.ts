import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const landmarkId = searchParams.get("landmarkId");

    const entries = await prisma.guestbookEntry.findMany({
      where: {
        isApproved: true,
        ...(landmarkId && { landmarkId }),
      },
      include: {
        landmark: {
          select: {
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    });

    return NextResponse.json({ entries });
  } catch (error) {
    console.error("Error fetching guestbook entries:", error);
    return NextResponse.json(
      { error: "Failed to fetch guestbook entries" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { landmarkId, name, message } = await request.json();

    // Validate landmark exists
    const landmark = await prisma.landmark.findUnique({
      where: { id: landmarkId },
    });

    if (!landmark) {
      return NextResponse.json(
        { error: "Landmark not found" },
        { status: 404 }
      );
    }

    const entry = await prisma.guestbookEntry.create({
      data: {
        landmarkId,
        name: name.trim(),
        message: message.trim(),
        isApproved: false, // Require approval
      },
    });

    return NextResponse.json({ entry });
  } catch (error) {
    console.error("Error creating guestbook entry:", error);
    return NextResponse.json(
      { error: "Failed to create guestbook entry" },
      { status: 500 }
    );
  }
}
