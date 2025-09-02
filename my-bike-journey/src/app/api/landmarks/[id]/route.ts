import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const {
      title,
      description,
      details,
      splineObjectName,
      position,
      isActive,
    } = await request.json();

    const landmark = await prisma.landmark.update({
      where: { id: params.id },
      data: {
        title,
        description,
        details,
        splineObjectName,
        position,
        isActive,
      },
    });

    return NextResponse.json({ landmark });
  } catch (error) {
    console.error("Error updating landmark:", error);
    return NextResponse.json(
      { error: "Failed to update landmark" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.landmark.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting landmark:", error);
    return NextResponse.json(
      { error: "Failed to delete landmark" },
      { status: 500 }
    );
  }
}
