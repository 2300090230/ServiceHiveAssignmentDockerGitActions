FROM node:20-alpine AS build
WORKDIR /practicedf
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#Stage 2: Serve production
FROM nginx:alpine
COPY --from=build /practicedf/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]