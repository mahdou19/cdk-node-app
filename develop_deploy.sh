#!/bin/bash

cd ./cdk_deploy

npm install

cdk deploy

ipInstanceEc2=$(aws cloudformation describe-stacks --stack-name CdkDeployStack --query "Stacks[0].Outputs[0].OutputValue" --output text)


echo "-----------------------------------------"

cd ..

chmod 400 example-1.pem

ssh -i "example-1.pem" ec2-user@$ipInstanceEc2

sudo docker pull mahdou/node-example-1


