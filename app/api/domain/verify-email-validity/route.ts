import { NextRequest, NextResponse } from 'next/server';
import { config } from '@/lib/local-api-config';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/types/auth';
import { Session } from 'next-auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { uid, newEmail } = body;

    if (!uid || !newEmail) {
      return NextResponse.json(
        { error: 'Missing required fields (uid, newEmail)' },
        { status: 400 }
      );
    }

    // Get session to verify user is authenticated
    const session = await getServerSession(authOptions) as Session & { user: { id: string } };
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized - No authenticated user found' },
        { status: 401 }
      );
    }

    // Get session_id from request cookies
    const cookies = req.headers.get('cookie');
    const sessionId = cookies?.split(';')
      .find(cookie => cookie.trim().startsWith('session_id='))
      ?.split('=')[1];

    // Forward the request to the Lambda function
    const res = await fetch(`${config.API_URL}/users/domain/verify-email-valid`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...(sessionId && { 'Cookie': `session_id=${sessionId}` })
      },
      body: JSON.stringify({
        uid,
        newEmail
      }),
      credentials: 'include'
    });

    const responseText = await res.text();
    
    if (!res.ok) {
      // If the backend returns 401, we should also return 401
      if (res.status === 401) {
        return NextResponse.json(
          { error: 'Unauthorized - Session expired or invalid' },
          { status: 401 }
        );
      }
      
      let errorData;
      try {
        errorData = JSON.parse(responseText);
      } catch (e) {
        errorData = { error: responseText };
      }
      return NextResponse.json(errorData, { status: res.status });
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      data = { error: 'Invalid JSON response' };
    }
    
    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    console.error('Error in verify-email-validity route:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
} 