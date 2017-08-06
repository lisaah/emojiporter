# emojiporter

CLI utility to export/import custom emojis for Mattermost.

## Prerequisites

* NPM and [Node](https://nodejs.org/en/download/)

## Install

```bash
$ npm i -g emojiporter
```

## Usage

You can bulk export or upload emojis using the YAML format that emojipacks use. Specify what you want to do, and it'll ask you a few relevant questions.

Export Emoji:

```bash
$ emojiporter export
Mattermost Server URL: https://mattermost.mymattermostdomain.com
Team ID (not team name): ccxzr5hmdfr4d89ep193e1warc
Username or e-mail: hey@gmail.com
Password: *****
Export title: MahMojis
Export file (.yaml): mahmojis.yaml
```

Import Emoji:

```bash
$ emojiporter import
Mattermost Server URL: https://mattermost.mymattermostdomain.com
Team ID (not team name): ccxzr5hmdfr4d89ep193e1warc
Username or e-mail: hey@gmail.com
Password: *****
Import file (.yaml): ./example/penz.yaml
```

Alternatively, you can supply the parameters at once. The parameters are described in more detail below.

```bash
$ emojiporter import --url https://mattermost.mymattermostdomain.com --teamId ccxzr5hmdfr4d89ep193e1warc --loginId hey@gmail.com --password sweetpassword --importFile ./example/penz.yaml
```
## Parameters

**action** - [export|import] Whether to export existing custom emojis to a yaml file or to import new custom emojis from a yaml file.

**userProvideToken** - [true|false] Authenticate requests by using the Mattermost tokens that you can find in cookies or via logging in using a username/email. Use this to workaround things like SSO logins. Default: false.

**--url** - Mattermost Server URL. Example: https://mattermost.mymattermostdomain.com

**--teamId** - Team ID, not to be confused with the team name. The easiest way I've found to get this is to pop open the Network in the Developer tab and grab it from the URL. Example: `{mattermost_server}/api/v3/teams/{team_id_here}/channels/`

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
