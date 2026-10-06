import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = getServiceSupabase();

    const { data, error } = await supabase.from('inquiries').insert([
      {
        name: body.name,
        email: body.email || '',
        phone: body.phone || '',
        subject: body.subject || 'General Inquiry',
        message: body.message,
        status: 'new',
      },
    ]);

    if (error) {
      console.error('Supabase inquiry insert error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('API inquiry route error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
