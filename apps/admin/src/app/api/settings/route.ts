import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Navigate dynamically out of apps/admin to the Monorepo Root File
const statePath = path.join(process.cwd(), '../../registration_state.json');

export async function GET() {
  try {
    if (fs.existsSync(statePath)) {
      const data = fs.readFileSync(statePath, 'utf8');
      return NextResponse.json(JSON.parse(data));
    }
    return NextResponse.json({ isOpen: true });
  } catch {
    return NextResponse.json({ isOpen: true });
  }
}

export async function POST(req: Request) {
  try {
    const { isOpen } = await req.json();
    fs.writeFileSync(statePath, JSON.stringify({ isOpen }, null, 2));
    return NextResponse.json({ success: true, isOpen });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
