import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await axios.delete(`http://localhost:8000/api/users/delete/${id}`);
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Failed to delete user", err);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
