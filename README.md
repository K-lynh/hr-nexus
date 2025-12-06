

✅ 1. Chuẩn bị

Yêu cầu duy nhất:

Máy có cài Docker Desktop (Windows/Mac) hoặc Docker Engine (Linux)

✅ 2. File Docker cần có

Trong thư mục gốc của dự án HR Nexus cần có Dockerfile với nội dung sau:

# 1. Build ứng dụng
FROM node:18 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 2. Serve bản build bằng Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

✅ 3. Build Docker image

Mở terminal trong thư mục dự án (nơi có Dockerfile), chạy lệnh:

docker build -t hr-nexus .


Giải thích: Lệnh này đóng gói ứng dụng thành một image tên hr-nexus.

✅ 4. Chạy ứng dụng trong Docker

Sau khi build thành công, chạy container:

docker run -p 8080:80 hr-nexus

✅ 5. Truy cập ứng dụng

Mở trình duyệt và truy cập:

👉 http://localhost:8080

Ứng dụng HR Nexus sẽ xuất hiện và hoạt động bình thường.
