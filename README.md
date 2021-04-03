# EC2 Instances on AWS

This repo contains simple code for a server that is meant to be hosted on AWS. It contains a frontend page as well as an API endpoint tester. Hopefully this README can be used to create your own EC2 instance and host a server on it!

## What is [AWS](https://aws.amazon.com/)?
AWS stands for Amazon Web Services and is the cloud computing sector of Amazon. They provide dozens of remote computing functions ranging from database management (where I will be working) to machine learning. EC2 instances are considered the essential building blocks of much of AWS.

## What are [EC2](https://aws.amazon.com/ec2/) Instances?
EC2 stands for Elastic Compute Cloud and instances are basically computers that are meant to be accessed remotely. They have guarantees of accessibility/availability for users as well as easy upward and downward scalability to ensure an effective cost-performance ratio. It might help to think of EC2 instances as Raspberry Pis.

## Why EC2?
Well, for the same reasons that you might want to use a Raspberry Pi to host a server off of your own personal computer, you may want a cloud computer to host. Of course there are advantages and disadvantages to both, but you could imagine that something like scalability would be much better on AWS.

## Who uses EC2 Instances?
Well you may already know this but companies like Netflix, Uber, Airbnb, GE, and Expedia are some of the many, many users of AWS technologies.

## Setup

### SSH
SSH, or Secure Shell, is a protocol used to securely log onto remote systems. It is the most common way to access remote Linux servers. I believe that UNIX users will have access to the ssh command in their terminals by default, but Windows users may have to enable the feature. You can install OpenSSH Server/Client by launching Windows Settings and then navigating to Apps > Optional features, clicking Add a feature, selecting OpenSSH Server/Client, and clicking Install for both.

Connections with SSH are covered nicely in this [DigitalOcean tutorial](https://www.digitalocean.com/community/tutorials/how-to-use-ssh-to-connect-to-a-remote-server)

### Create EC2 Instance
head over to the [AWS Management Console](https://console.aws.amazon.com/) and click on "Launch a virtual machine" under the "Build a solution" header. Go through the menus following along with the workshop in which I explain them and launch your instance!

### Connect to EC2 Instance
If you create an Amazon Linux instance, you will need to access the instance from the ec2-user account. If you create an Ubuntu instance, you will need to access the instance from the ubuntu account. Otherwise, you can Google what the right user is for a specific AMI.

In the terminal on your local machine you can type
```bash
ssh -i private-key.pem username@ec2-instance-public-ip
```

The '-i' input indicates identity of client for security. If we exclude the private key, we will not be able to access the instance.

Now you should be connected to your remote EC2 instance!

### Installing Git and NVM
For the rest of the workshop, we will need to have Git and Node.js available on the EC2 instance.

Git:
```bash
sudo yum install git
```

In order to confirm that git has been installed, we will run ```git``` and check its output.

NVM:
```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

Then copy the commands it returns to complete the installation. In order to confirm that NVM is installed, we will run ```nvm list``` and check its output.

As of the date of posting, the most recent recommended version of Node.js is 14.16.0. To install this version and use it, we will use NVM
```bash
nvm install 14.16.0 && nvm use 14.16.0
```

Great! We now have Git and Node.js available on our EC2 Instance.

### Hosting on EC2
We want to make sure that anything you host on this instance can be accessed remotely as well. First, let's clone this repo by running the following command
```bash
git clone https://github.com/Pdbz199/matahacks-ec2-instances
```

We will be using a new Node.js package called PM2 (Process Manager 2) in order to constantly run our Node.js server. To install the package, run this command:
```bash
npm install pm2 -g
```

We check that it is installed by running
```bash
pm2 list
```

Now, change directory to the cloned repo and install the node packages.
```bash
cd matahacks-ec2-instances && npm install
```

Finally, we can run the server with PM2 with the following command
```bash
pm2 start server.js --name=MataHacks-Server
```

Once we confirm that server is being hosted on our EC2 instance, we can check to see if the website at `http://ec2-instance-public-ip:3000/` is loading correctly from our local machine. Additionally, we will want to run the `what_time.js` file from our local machine to see that the API endpoint, '/current-time' is working.

If you wish to stop the server process via PM2, you can type
```bash
pm2 stop MataHacks-Server
```

If you wish to remove the server process from the PM2 list, you can type
```bash
pm2 delete MataHacks-Server
```

## License
[MIT](https://choosealicense.com/licenses/mit/)