# Hafiz Muneeb Hassan — AI/ML Engineer Portfolio

A production-grade, high-performance portfolio built with Next.js 14 (App Router), TypeScript, and Tailwind CSS, showcasing artificial intelligence engineering, machine learning systems, and interactive technical architecture demonstrations.

---

## Architecture & Deployment Flow

```text
Developer
   ↓
GitHub Repository (hassanlab27/portfolio)
   ↓
Pull Request / Push to main
   ↓
GitHub Actions CI
   ├── Dependency Installation (npm ci)
   ├── Code Quality & Linting (npm run lint)
   ├── Type Safety Check (npm run typecheck)
   └── Production Compilation (npm run build)
          ↓
       Merge to main
          ↓
     Automatic Production Deployment (Vercel)
          ↓
     Custom Domain (DNS / SSL Termination)
          ↓
     HTTPS Production Site
```

---

## Requirements

- **Node.js**: `>= 20.0.0 < 23.0.0` (LTS 20.x recommended, specified in `.nvmrc`)
- **Package Manager**: `npm` `>= 10.0.0` (lockfile committed with `package-lock.json`)

---

## Installation

Clone the repository and install dependencies using clean install:

```bash
git clone https://github.com/hassanlab27/portfolio.git
cd portfolio
npm ci
```

---

## Environment Variables

Copy the example environment configuration:

```bash
cp .env.example .env.local
```

### Available Variables

| Variable | Required | Default | Description |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Optional | `https://muneebhassan.dev` | Canonical public site URL for SEO metadata, Open Graph, sitemap, and robots.txt |

> **Note**: Never commit `.env` or `.env.local` files to Git. All secrets and environment overrides are strictly ignored by `.gitignore`.

---

## Local Development

Start the Next.js development server:

```bash
npm run dev
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

---

## Production Build & Verification

To test the exact production build locally:

```bash
# 1. Validate code formatting and linting rules
npm run lint

# 2. Run TypeScript strict type-checking
npm run typecheck

# 3. Create optimized production build
npm run build

# 4. Preview the production server locally
npm run start
```

---

## CI/CD Pipeline

The repository includes a GitHub Actions workflow located at [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

The pipeline automatically triggers on:
- All pull requests targeting `main`
- Direct pushes to `main`

The CI job enforces:
1. Deterministic dependency resolution (`npm ci`) using Node 20 LTS with npm cache
2. Strict linting (`npm run lint`)
3. Static type validation (`npm run typecheck`)
4. Production bundle compilation (`npm run build`)

---

## Production Deployment to Vercel

### 1. Connect Repository
1. Log in to [Vercel](https://vercel.com).
2. Click **Add New...** > **Project**.
3. Import `hassanlab27/portfolio`.
4. Vercel automatically detects Next.js with root directory settings.

### 2. Configure Environment Variables
In **Project Settings** > **Environment Variables**, add:
- `NEXT_PUBLIC_SITE_URL`: `https://your-custom-domain.com` (e.g. `https://muneebhassan.dev`)

### 3. Custom Domain & DNS
1. Navigate to **Project Settings** > **Domains**.
2. Enter your custom domain (apex `@` and `www`).
3. Configure your DNS provider with the records provided by Vercel:
   - Apex domain: `A` record pointing to `76.76.21.21`
   - Subdomain (`www`): `CNAME` record pointing to `cname.vercel-dns.com`
4. Automatic SSL certificates are provisioned and renewed by Let's Encrypt / Vercel.

---

## Security & Best Practices

- **Strict Security Headers**: Preconfigured in [`next.config.js`](next.config.js) including `Strict-Transport-Security` (HSTS), `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy`.
- **Information Disclosure Prevention**: `poweredByHeader` is disabled to omit `X-Powered-By`.
- **Dependabot**: Automated weekly updates for npm dependencies and GitHub Actions workflows via [`.github/dependabot.yml`](.github/dependabot.yml).
- **Code Ownership**: Configured in [`.github/CODEOWNERS`](.github/CODEOWNERS).

---

## Troubleshooting

- **Node Version Mismatch**: Run `nvm use` to automatically switch to the version specified in `.nvmrc`.
- **Dependency Drift**: If local packages behave unexpectedly, run `rm -rf node_modules .next && npm ci`.
- **Hydration Warnings**: Ensure client state does not depend on unmounted browser APIs before initial render.
