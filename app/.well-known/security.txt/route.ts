const securityText = `Contact: mailto:hello@skycode.dev
Expires: 2027-07-30T00:00:00.000Z
Canonical: https://skycode-ai-workspace.skymarketing737.chatgpt.site/.well-known/security.txt
Policy: https://skycode-ai-workspace.skymarketing737.chatgpt.site/security
Preferred-Languages: en
`;

export function GET() {
  return new Response(securityText, {
    headers: {
      "Cache-Control": "public, max-age=86400",
      "Content-Type": "text/plain; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
