This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started
First, make sure to set up proper environment variables in an `.env.local` file. For a basic local setup:

```
LANGMONTH_DB_TYPE="local"
LANGMONTH_DB_PATH="localdb/db.sqlite"
```

Then, install and run the development server:

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

We are also using Drizzle ORM + libsql for the database. Learn more about these technologies:

- [Drizzle](https://orm.drizzle.team/)
- [LibSQL](https://github.com/tursodatabase/libsql)

## Environment Variables

- `LANGMONTH_DB_TYPE` ("remote" | "local")
- `LANGMONTH_DB_PATH` (string) - the url to a libsql database (turso preferred) or a local filepath depending on the type
- `LANGMONTH_DB_TOKEN` (string) - the token to connect to the database (if required)
