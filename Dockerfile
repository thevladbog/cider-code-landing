# Multi-stage build for Next.js application
FROM node:22.14.0-alpine3.21 AS dependencies

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Build stage
FROM node:22.14.0-alpine3.21 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .

# Build arguments for environment variables
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_APP_URL
ARG CONTACT_EMAIL_TO
ARG CONTACT_EMAIL_FROM
ARG SMTP_HOST
ARG SMTP_PORT
ARG SMTP_SECURE
ARG SMTP_USER
ARG SMTP_PASS
ARG TRACKER_PRIVATE_KEY
ARG TRACKER_KEY_ID
ARG TRACKER_SERVICE_ACCOUNT_ID
ARG TRACKER_ORG_ID
ARG TRACKER_QUEUE_KEY

ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV CONTACT_EMAIL_TO=$CONTACT_EMAIL_TO
ENV CONTACT_EMAIL_FROM=$CONTACT_EMAIL_FROM
ENV SMTP_HOST=$SMTP_HOST
ENV SMTP_PORT=$SMTP_PORT
ENV SMTP_SECURE=$SMTP_SECURE
ENV SMTP_USER=$SMTP_USER
ENV SMTP_PASS=$SMTP_PASS
ENV TRACKER_PRIVATE_KEY=$TRACKER_PRIVATE_KEY
ENV TRACKER_KEY_ID=$TRACKER_KEY_ID
ENV TRACKER_SERVICE_ACCOUNT_ID=$TRACKER_SERVICE_ACCOUNT_ID
ENV TRACKER_ORG_ID=$TRACKER_ORG_ID
ENV TRACKER_QUEUE_KEY=$TRACKER_QUEUE_KEY
ENV NODE_ENV=production

RUN npm run build

# Production stage
FROM node:22.14.0-alpine3.21 AS runner

WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone output and public assets
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
