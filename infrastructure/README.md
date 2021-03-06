# Getting Started

This project requires aws-cdk, to install the aws-cdk cli run:

`npm install -g aws-cdk`

https://aws.amazon.com/cdk/

Make sure to have an IAM with Admin priviledges configured with AWS CLI

https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html

Then run `cdk synth` to synthesize the configuration into a cloudformation template.

Then `cdk deploy` To deploy the entire infastruture to your AWS account.

**_IMPORTANT_**

Make sure to run `cdk destroy` when finished otherwise you will be charged by AWS for
using their services

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

# Database - Server Setup

Set `dbName`, `dbPort` and `dbUsername` enviroment variables in the `.env` file.

After deploying to AWS, Secrets Manager will auto generate a password. The Database Credentials are automatically passed to the nodejs server through the fargate enviroment variables.

# Database Setup

DB password is automatiacally generated by AWS Secrets manager

Remote access the database with AWS session manager through the bastion host. No ssh/keys are required.

Session Manager:

1. Go to AWS Systems Manager Dashboard in the console
2. Click on Session Manager on sidebar
3. Click Start New Session
4. Select the cdk generated Bastion Host and click Start Session
5. install postgres on the bastion host
   `sudo amazon-linux-extras install postgresql11`
6. Get RDS hostname (see below)
7. connect to the database with the psql shell using the following command. database name, database port and database username were set by the user in the .env file.
   `psql -d name-of-db -h host-name -p port -U username`
8. Copy and paste the password from Secrets Manager (see below)
9. Copy and paste the create table commands from `server/Database/schema.sql`

Get RDS hostname

1. Go RDS dashboard on the console
2. Click on Databases in the sidebar
3. Click on the database generated by cdk
4. hostname will be under "Endpoint and Port"

Get DB Password from Secrets Manager:

1. Go to Secrets Manager Dashboard on the console
2. Click on Secrets in sidebar
3. Click on the secret generated by CDK
4. Scroll down to Secret Value and Click "Retrieve Secret Value"

Why Fargate?

AWS CDK is an advanced tool that requires expert AWS knowledge. It is not recommended
to modify the code without the prerequisite knowledge, even though it is written in typescript
which most web developers are fimiliar with. Improper modifications can lead to exposing
huge security holes, accidently creating expensive AWS resources, or breaking the infrastructure.
An associate level AWS certification or higher is a good baseline to have for working
effectively with this tool.
