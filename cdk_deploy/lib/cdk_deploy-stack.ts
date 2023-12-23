import { Stack, CfnOutput, aws_iam as iam } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { ICdkDeployStack } from "../bin/cdk_deploy";

export class CdkDeployStack extends Stack {
  constructor(scope: Construct, id: string, props: ICdkDeployStack) {
    super(scope, id, props);

    const { currentBranch } = props;
    const keyName = "example-1";

    const defaultVpc = ec2.Vpc.fromLookup(
      this,
      `CdkDeployStack-Vpc-${currentBranch}`,
      {
        isDefault: true,
      }
    );
    const role = new iam.Role(
      this,
      `CdkDeployStack-SimpleInstanceRole-${currentBranch}`,

      {
        assumedBy: new iam.ServicePrincipal("ec2.amazonaws.com"),
      }
    );

    const securityGroup = new ec2.SecurityGroup(
      this,
      `CdkDeployStack-SimpleInstanceSecurityGroup-${currentBranch}`,
      {
        vpc: defaultVpc,
        allowAllOutbound: true,
        securityGroupName: `CdkDeployStack-SimpleInstanceSecurityGroup-${currentBranch}`,
      }
    );

    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(22),
      "Allows SSH access from Internet"
    );

    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(80),
      "Allows HTTP access from Internet"
    );
    const instance = new ec2.Instance(
      this,
      `CdkDeployStack-SimpleInstance-${currentBranch}`,
      {
        vpc: defaultVpc,
        role: role,
        securityGroup: securityGroup,
        instanceName: `CdkDeployStack-SimpleInstance-${currentBranch}`,
        instanceType: ec2.InstanceType.of(
          ec2.InstanceClass.T2,
          ec2.InstanceSize.MICRO
        ),
        machineImage: ec2.MachineImage.latestAmazonLinux2(),
        keyName: keyName,
      }
    );

    new CfnOutput(
      this,
      `CdkDeployStack-SimpleInstanceOutput-${currentBranch}`,
      {
        value: instance.instancePublicIp,
      }
    );
  }
}
