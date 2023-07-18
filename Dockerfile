FROM node:lts-alpine3.17 as builder
# Create app directory
WORKDIR /wbms_backend

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
# COPY package.json ./
# COPY package-lock.json ./
# COPY tsconfig.json ./
COPY --chown=node:node package*.json ./

# In order to run `npm run build` we need access to the Nest CLI which is a dev dependency.
# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci install

# Bundle app source
COPY --chown=node:node .env.production ./.env
COPY --chown=node:node . .

RUN npx prisma generate 

# Run the build command which creates the production bundle
RUN npm run build

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
RUN npm ci --only=production && npm cache clean --force

# Use the node user from the image (instead of the root user)
USER node


# production environment
FROM node:lts-alpine3.17 as production
# Create app directory
WORKDIR /wbms_backend

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=builder /wbms_backend/node_modules ./node_modules
COPY --chown=node:node --from=builder /wbms_backend/dist ./dist
COPY --chown=node:node --from=builder /wbms_backend/cert ./cert
COPY --chown=node:node --from=builder /wbms_backend/.env.production ./.env

# Expose port
EXPOSE 6001

# Start the server using the production build
CMD ["node", "dist/main.js"]