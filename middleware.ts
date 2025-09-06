import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check for cart cookie
  if (!request.cookies.get('sessionCartId')) {
    // Generate cart cookie
    const sessionCartId = crypto.randomUUID();

    // Create a new response
    const response = NextResponse.next();

    // Set the newly generated sessionCartId in the response cookies
    response.cookies.set('sessionCartId', sessionCartId);

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

// Закінчив 5- 48 кфнець, потрібно взят и інфу з документа і прописати в файлах і затестити