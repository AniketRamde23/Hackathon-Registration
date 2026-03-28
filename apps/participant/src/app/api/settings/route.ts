import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Navigate dynamically out of apps/participant to the Monorepo Root File
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
