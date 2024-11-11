User clicks "Sign in with Google" on your frontend

Frontend redirects to Google's consent screen

Google redirects back to your frontend with an authorization code

Frontend sends this code to your backend

Backend verifies the code with Google and creates a session

Backend sends back a session token to frontend

Frontend stores the token and uses it for subsequent requests

Let's implement this step by step:

First, you'll need to set up a project in Google Cloud Console and get credentials:

Go to Google Cloud Console

Create a project

Enable Google OAuth2 API

Create OAuth 2.0 credentials (you'll need client ID and client secret)

# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
