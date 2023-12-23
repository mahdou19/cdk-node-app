#!/usr/bin/env node
import "source-map-support/register";
import { StackProps, App } from "aws-cdk-lib";
import { CdkDeployStack } from "../lib/cdk_deploy-stack";

export interface ICdkDeployStack extends StackProps {
  currentBranch: string;
}

export const stackSuffix = process.env.LOCAL_BRANCH_AUTHOR || "local-mamadou";

const stackProps: ICdkDeployStack = {
  currentBranch: stackSuffix,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT || "",
    region: process.env.CDK_DEFAULT_REGION || "eu-west-1",
  },
};

const app = new App();
new CdkDeployStack(app, "CdkDeployStack", stackProps);
