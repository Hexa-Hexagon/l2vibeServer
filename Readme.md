# L2Vibe Server

## Start and build project
Use commands:

# Create jwt.key and jwt.key.pub and transgering to .env file
```bash
chmod +x create_jwt_key.sh
chmod +x backup.sh
./create_jwt_key.sh
```

# Create images directory
```bash
mkdir images
```

# Install docker
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh ./get-docker.sh --dry-run
```

# Create docker container
```bash
sudo docker-compose create
```

# Start containers
```bash
sudo docker start mongo_service http_service
```

# Install nginx
```bash
sudo apt install nginx
```

# Install ufw for block ports
```bash
sudo apt-get install ufw
```

# Add allowed ports 
```bash
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
```