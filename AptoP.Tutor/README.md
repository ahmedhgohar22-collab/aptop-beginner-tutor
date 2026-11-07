# aPToP tutor (Blazor WebAssembly)

Blazor WASM remake of the beginner interactive tutor for *a Practical Theory of Programming* (Hehner). Runs as static files on IIS — no Node.js on the server.

## Develop

```bash
dotnet run --project AptoP.Tutor
```

Course content is exported from the React TypeScript sources:

```bash
npx tsx scripts/export-blazor-content.mjs
```

## Publish for edu.yangotech.co.uk (IIS)

```bash
dotnet publish AptoP.Tutor -c Release -o AptoP.Tutor/publish
```

FTP the contents of `AptoP.Tutor/publish/wwwroot/` to the site root (`index.html`, `_framework/`, `css/`, `data/`, `slides/`, `web.config`).

Requires IIS URL Rewrite for deep links; MIME types for `.wasm` / `.dll` are in `web.config`.
