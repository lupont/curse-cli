### To use this script, you need nodejs and npm installed on your machine.

1. Clone the repo by running `git clone https://github.com/lupont/curse-cli.git` in your desired directory.
2. Run `npm install` to download dependencies.
3. Run `npm install -g .` to install the script globally on your machine. 
    * **NOTE**: this is not required, but necessary if you want to run the script anywhere but in the folder you cloned in. 
4. Run `curse` to see list of available commands.
    * If you did not install it globally, run `./bin/index.js` in the folder where you cloned the repo.

### Basic usage
The script creates a file called `curse.json` in your home directory upon first execution. This file contains three preferences:

* `loader` This is the type of mod loader you want the script to search mods for. Either fabric, forge, or both. Default is fabric.
* `version` The Minecraft version you want to use (e.g. 1.12.2).
* `downloadPath` This is the directory you want the mods to be downloaded to. Default is current directory.

Run `curse get-preferences` to see your preferences. To update one, use either set-loader, set-version, or set-path followed by the value you want to set to. Run `curse get-preferences` again to see the change.

After you have configured the preferences to your liking, you can run `curse install <query>` to search and install mods with their dependencies. 

Everything written here is documented in the script and accessed simply by running `curse` without arguments. Good luck!