import { NextResponse } from 'next/server';
import { version } from '../../../../package.json';

export const dynamic = 'force-static';

export function GET() {
  return NextResponse.json({ version });
}
