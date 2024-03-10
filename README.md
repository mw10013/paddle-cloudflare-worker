<h1 align="center">
  Paddle Cloudflare Worker
</h1>

<div align="center">
  <p>
    Simple Cloudflare worker to show Paddle Node SDK running on Cloudflare. 
  </p>
</div>

## Deployed

- https://paddle-cloudflare-worker.mw10013.workers.dev/
- Shows the first page of products as json.

## Local Setup

- Copy `.dev.vars.example` to `.dev.vars` and spcecify `PADDLE_API_KEY`.
- pnpm install
- pnpm dev

## Background

[paddle-node-sdk](https://github.com/PaddleHQ/paddle-node-sdk) does not run on Cloudflare because it imports `crypto` without a `node:` prefix. Node.js compatibility in Cloudflare requires the `node:` prefix per https://developers.cloudflare.com/workers/runtime-apis/nodejs/

`paddle-node-sdk` is cjs and `node:crypto` on Cloudflare seems to be esm. Cjs must use a dynamic import to import esm.

The `cloudflare-prepare` branch in https://github.com/mw10013/paddle-node-sdk contains these changes. We make it a dependency in `package.json`.

```json
"@paddle/paddle-node-sdk": "github:mw10013/paddle-node-sdk#cloudflare-prepare"
```

Note that the `cloudflare` branch in https://github.com/mw10013/paddle-node-sdk contains the necessary changes. The `cloudflare-prepare` branch, which is branched from `cloudflare`, simply adds a `prepare` script in package.json to set up the github repo as a library dependency.
