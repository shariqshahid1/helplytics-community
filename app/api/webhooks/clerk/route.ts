import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    console.warn('WEBHOOK_SECRET is missing. Webhook verification skipped (Mock Mode).')
  }

  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  if (WEBHOOK_SECRET) {
    const wh = new Webhook(WEBHOOK_SECRET)
    try {
      evt = wh.verify(body, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      }) as WebhookEvent
    } catch (err) {
      console.error('Error verifying webhook:', err)
      return new Response('Error occured', {
        status: 400,
      })
    }
  } else {
    // Fallback for mock mode if secret is missing
    evt = payload as WebhookEvent
  }

  const eventType = evt.type

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, first_name, last_name, image_url, email_addresses } = evt.data
    const email = email_addresses[0].email_address
    const name = `${first_name || ''} ${last_name || ''}`.trim() || email.split('@')[0]

    console.log(`Mock user sync for: ${name} (${id}) - Prisma disabled.`);
  }

  return new Response('', { status: 200 })
}
