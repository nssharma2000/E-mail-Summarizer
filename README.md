# E-mail Summarizer App

## Approach

I used an input element to upload text files for transcripts. The app reads its contents. I used Groq SDK to summarize transcripts. I created an endpoint that takes content and prompt and uses Groq SDK to summarize transcripts. I used Resend to send mails to e-mail addresses (comma-separated) entered in a text area element. I created an endpoint for it.

## Process

### Backend Setup

1. Created an Express.js backend to handle email sending.

2. Used Resend API for reliable email delivery.

3. Implemented a POST /send_email endpoint that takes:

   •summary: Meeting summary text.
   •recipients: Array of email addresses.

The endpoint calls resend.emails.send() and sends the summary to all recipients.

### Deployment

The app is deployed on Render (backend) and Vercel (frontend).

Environment variables (API key) are stored securely.

## Tech Stack

**Frontend**: React
**Backend**: Node.js, Express.js
**E-mail Service**: Resend
**Deployment**: Render and Vercel

## Setup

### Frontend

```
cd frontend
npm run dev
```

### Backend

```
cd backend
node index.js
```

**Deployed Link** : https://e-mail-summarizer.vercel.app/
