# emojiporter

CLI utility to export/import custom emojis for Mattermost.

## Prerequisites

* NPM and [Node](https://nodejs.org/en/download/)

## Versions

| Mattermost API| Emojiporter |
|--------------:|------------:|
|          v3.x |        v1.x | 
|          v4.x |        v2.x | 

## Install

```bash
$ npm i -g emojiporter
```

## Usage

You can bulk export or upload emojis using the YAML format that emojipacks use. Specify what you want to do, and it'll ask you a few relevant questions.

### Export Emoji:

```bash
$ emojiporter export
Mattermost Server URL: https://mattermost.mymattermostdomain.com
Username or e-mail: hey@gmail.com
Password: *****
Export title: MahMojis
Export file (.yaml): mahmojis.yaml
```

### Import Emoji:

```bash
$ emojiporter import
Mattermost Server URL: https://mattermost.mymattermostdomain.com
Username or e-mail: hey@gmail.com
Password: *****
Import file (.yaml): ./example/penz.yaml
```

Alternatively, you can supply the parameters at once. The parameters are described in more detail below.

```bash
# Using username and password
$ emojiporter import --url https://mattermost.mymattermostdomain.com --loginId hey@gmail.com --password sweetpassword --importFile ./example/penz.yaml

# Using auth token and user id
$ emojiporter import true --url https://mattermost.mymattermostdomain.com --token 1eniy86hjtr338k4zdgc9bfwae --id 8sjipfs0x3de8nmhciecej7tuc --importFile ./example/penz.yaml
```

## Parameters

**action** - [export|import] Whether to export existing custom emojis to a yaml file or to import new custom emojis from a yaml file.

**userProvideToken** - [true|false] Authenticate requests by using the Mattermost tokens that you can find in cookies or via logging in using a username/email. Use this to workaround things like SSO logins. Default: false.

**--url** - Mattermost Server URL. Example: https://mattermost.mymattermostdomain.com

**--token** - Token for MM requests. Can be found in cookies as: MMAUTHTOKEN.

**--id** - User id for MM requests. Can be found in cookies as: MMUSERID.

**--loginId** - The username or e-mail linked to the Mattermost account.

**--password** - Password for the Mattermost account.

**--mfaToken** - Multi-factor authentication token.

**--exportTitle** - Title to be used for exported emoji yaml file.

**--exportFile** - File to export the emoji information to.

**--importFile** - Local file or remote URL for the yaml to use to import emojis.

## Credit

Based off and designed to work with [emojipack](https://github.com/lambtron/emojipacks) bulk emojis.

## License

MIT
