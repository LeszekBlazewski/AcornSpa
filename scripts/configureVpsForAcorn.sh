#!/bin/bash

# CONDITIONS

shouldInstallNginx=true

shouldConfigureFrontend=true

shouldConfigureBackend=true

# CONSTANS

vsftpdConfigPath=/etc/vsftpd.conf

nginxAcornFrontPath=/etc/nginx/sites-available/AcornFront

nginxAcornApiPath=/etc/nginx/sites-available/AcornApi

acornApiServicePath=/etc/systemd/system/acorn-api.service

nginxSymlinkPath=/etc/nginx/sites-enabled

# BASIC NGINX SETUP

if $shouldInstallNginx; then
    echo "Configure basic nginx settings for both frontEnd and backEnd"
    sudo apt update
    sudo apt install nginx
    sudo ufw allow 'Nginx HTTP'
    # remove default site from sites-enable
    sudo rm /etc/nginx/sites-enabled/default
    # Start nginx and enable process on boot startup
    echo "start nginx and enable process on boot startup"
    sudo systemctl start nginx
    sudo systemctl enable nginx
    sudo systemctl restart nginx
fi

# ACORN FRONT SETUP

if $shouldConfigureFrontend; then
    echo Configure Angular front
    # Install vsftpd
    sudo apt-get install vsftpd
    # Configure vsftpd to set access for received files to 775
    echo wiping default vsftpd config and writing new rules
    cat > $vsftpdConfigPath <<EOF
listen=NO
listen_ipv6=YES
local_enable=YES
write_enable=YES
local_umask=0002
file_open_mode=0777
use_localtime=YES
xferlog_enable=YES
connect_from_port_20=YES
secure_chroot_dir=/var/run/vsftpd/empty
pam_service_name=ftp
rsa_cert_file=/etc/ssl/certs/ssl-cert-snakeoil.pem
rsa_private_key_file=/etc/ssl/private/ssl-cert-snakeoil.key
ssl_enable=NO
EOF
    # Start vsftpd and enable process on boot startup
    echo "start vsftpd and enable on system boot"
    sudo systemctl start vsftpd
    sudo systemctl enable vsftpd
    sudo systemctl restart vsftpd
    # Configure nginx to serve frontend page
    echo Configure nginx to serve frontend page
    cat > $nginxAcornFrontPath<<EOF
server {
    listen 80;
    listen [::]:80;
    root /var/www/AcornFront;
    index index.html index.htm;

    location / {
    try_files \$uri \$uri/ /index.html =404;
    }
}
EOF
    # Create sym link for new config
    echo "Create sym link for new config"
    sudo ln -s $nginxAcornFrontPath $nginxSymlinkPath
    # reload nginx
    sudo nginx -s reload
fi

# ACORN BACK SETUP

if $shouldConfigureBackend; then
    # Configure packagaes specific for .NET API
    echo "Install required packages for .NET API"
    wget -q https://packages.microsoft.com/config/ubuntu/18.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
    sudo dpkg -i packages-microsoft-prod.deb
    sudo add-apt-repository universe
    sudo apt-get install apt-transport-https
    sudo apt-get update
    sudo apt-get install dotnet-sdk-2.2
    # Configure nginx to serve API
    echo Configure nginx serve API
    cat > $nginxAcornApiPath <<EOF
server {
    listen 4201;
    location / {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection keep-alive;
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF
    # Create sym link for new config
    echo "Create sym link for new config"
    sudo ln -s $nginxAcornApiPath $nginxSymlinkPath
    # reload nginx
    sudo nginx -s reload
    # Configure acorn api service
    echo Configure acorn api service
    cat > $acornApiServicePath <<EOF
[Unit] 
Description=Acorn API

[Service] 
WorkingDirectory=/apis/acornapi
ExecStart=/usr/bin/dotnet /apis/acornapi/AcornAPI.dll
Restart=always
RestartSec=10 # Restart service after 10 seconds if dotnet service crashes
SyslogIdentifier=offershare-web-app
Environment=ASPNETCORE_ENVIRONMENT=Production

[Install] 
WantedBy=multi-user.target
EOF
    # Start acorn api service and enable process on boot startup
    echo "start acorn api service and enable process on boot startup"
    sudo systemctl enable acorn-api.service
    sudo systemctl start acorn-api.service
    sudo systemctl restart acorn-api.service
fi


# TEST SECTION TO CHECK IF ALL SERVICES ARE UP AND RUNNING

if $shouldConfigureFrontend || $shouldConfigureBackend; then
    echo "check if nginx is running and configs are valid"
    sudo systemctl status nginx
    sudo nginx -t
fi

if $shouldConfigureFrontend; then
    echo check acorn front setup
    echo "check if vsftp is running"
    sudo systemctl status vsftpd
fi

if $shouldConfigureBackend; then
    echo check acorn back setup
    echo "check if acorn service is running"
    sudo systemctl status acorn-api.service
fi
