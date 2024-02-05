import { headers } from 'next/headers'
import { NextResponse } from 'next/server';

export async function POST(request : Request) {
    const APIKey = process.env.SUPABASE_WEBHOOK_KEY;
    const headersList = headers()
    const APIKeyRequest= headersList.get('API-Key')
    headersList.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
    if(APIKeyRequest==null){
        return new Response('"API-Key" header is missing', {
            status: 401
          })
    }
    else if(APIKeyRequest !== APIKey){
        return new Response('API Key is not valid', {
            status: 403
          })
    }

    const date = new Date()


    return NextResponse.json({
        "revalidated": true,
        "date": date.toISOString()
    },{
        status: 200,
      }
    )



    
}