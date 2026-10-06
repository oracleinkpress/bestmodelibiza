import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = getServiceSupabase();

    const { data, error } = await supabase.from('bookings').insert([
      {
        model_id: body.modelId || null,
        model_name: body.modelName || 'General Inquiry',
        client_name: body.clientName,
        client_contact: body.clientContact,
        contact_method: body.contactMethod || 'whatsapp',
        booking_date: body.bookingDate || null,
        booking_time: body.bookingTime || null,
        duration: body.duration || '2 Hours',
        location_type: body.locationType || 'Private Villa',
        location_address: body.locationAddress || '',
        special_requests: body.specialRequests || '',
        status: 'pending',
      },
    ]);

    if (error) {
      console.error('Supabase booking insert error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('API booking route error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
