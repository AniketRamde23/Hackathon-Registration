FROM node:18-alpine

# Setup Application Directory mapping
WORKDIR /app

# Copy dependency lock files first explicitly avoiding cache invalidation
COPY package*.json ./

# Install execution layer strictly mapped for Production payloads
RUN npm ci --only=production

# Shift rest of isolated architecture
COPY . .

# Execute internal Turborepo / TSC pipelines
RUN npm run build

# Expose internal router endpoint bounds
EXPOSE 5000

# Execute entrypoint
CMD ["npm", "start"]
