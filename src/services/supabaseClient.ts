// pages/api/kyc/verify.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // NOT anon key
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { fullName, email, country, idNumber, publicKey } = req.body;

  if (!fullName || !email || !country || !idNumber) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const { error } = await supabase.from('admin_kyc').insert({
      full_name: fullName,
      email,
      country,
      id_number: idNumber,
      public_key: publicKey || null,
      verified_at: new Date().toISOString(),
    });

    if (error) throw error;

    return res.status(200).json({ message: 'KYC verified and recorded' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message || 'Server error' });
  }
}
