ssh-keygen -t rsa -b 4096 -m PEM -f jwt.key -N ""
openssl rsa -in jwt.key -pubout -outform PEM -out jwt.key.pub
echo "PUBLIC_JWT_KEY='" > .env
cat jwt.key.pub >> .env
echo "'" >> .env
echo "SECRET_JWT_KEY='" >> .env
cat jwt.key >> .env
echo "'" >> .env