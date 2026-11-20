import { NextResponse } from 'next/server';
import { checkCoverage, SUPPORTED_AREAS } from '@/lib/serviceAreas';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const zip = searchParams.get('zip');

  if (!zip) {
    return NextResponse.json({
      success: true,
      areas: SUPPORTED_AREAS
    });
  }

  const result = checkCoverage(zip);
  return NextResponse.json({
    success: true,
    ...result
  });
}
