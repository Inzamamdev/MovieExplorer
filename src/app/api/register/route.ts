import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabase } from "@/config/supabase";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert into Supabase
    const { data, error } = await supabase
      .from("users")
      .insert([{ email, password_hash: passwordHash }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.log(data);
    return NextResponse.json({ user: data });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message || "Something went wrong" },
      { status: 500 }
    );
  }
}
