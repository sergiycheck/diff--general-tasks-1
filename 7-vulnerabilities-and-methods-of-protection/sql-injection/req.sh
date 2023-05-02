# !/bin/sh

curl -X POST -H "Content-Type: multipart/form-data" \
-F "email=user1@gmail.com" -F "password=password1" http://127.0.0.1:3000/api/auth/callback/signin?


